import { Proof } from '@reclaimprotocol/reclaim-sdk'
import { useEffect, useState } from 'react'
import { ethers } from 'ethers'
import {
  useAccount,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction
} from 'wagmi'
import { reclaimNetworksAddresses } from '../../reclaimNetworkAddresses'
import RECLAIM_WITH_IDENTITY from '../../IdentityWithReclaim.json'
import { Button, Flex, Spinner, Text, useToast, Link } from '@chakra-ui/react'

export default function PolygonAttestor ({
  provider,
  proof
}: {
  provider: string
  proof: Proof | undefined
}) {
  const [hashIndex, setHashIndex] = useState<string | undefined>(undefined)
  const [hashValue, setHashValue] = useState<string | undefined>(undefined)
  const [proofReq, setProofReq] = useState<any>(null)
  const [tranactionHash, setTransactionHash] = useState<any>(null)
  const [isPrepared, setIsPrepared] = useState(false)

  const [settled, setSettled] = useState(false)
  const toast = useToast()
  useEffect(() => {
    if (proof == undefined) return
    const proofReqBef = {
      claimInfo: {
        provider: proof.provider,
        context: proof.context,
        parameters: proof.parameters
      },
      signedClaim: {
        signatures: proof.signatures,
        claim: {
          identifier: proof.identifier,
          owner: ethers.computeAddress(`0x${proof.ownerPublicKey}`),
          timestampS: proof.timestampS,
          epoch: proof.epoch
        }
      }
    }
    setProofReq(proofReqBef)
    setHashIndex(BigInt(proof.identifier).toString())
    setHashValue(
      BigInt(ethers.hashMessage(JSON.stringify(proof.parameters))).toString()
    )
  }, [proof])

  const contractAddress = '0x169Fe90Cd62ca36500cAea06c50Fb7002A00a074'

  //@ts-ignore
  const { config } = usePrepareContractWrite({
    address: contractAddress,
    abi: RECLAIM_WITH_IDENTITY.abi,
    functionName: 'addClaimHashAndTransit',
    args: [hashIndex, hashValue, proofReq],
    chainId: reclaimNetworksAddresses['polygon-mumbai']['chainId'],
    onSuccess (data) {
      setIsPrepared(true)
      console.log('Successful - register prepare: ', data)
    },
    onError (error) {
      console.log(error)
      toast({
        title: 'Error',
        description: error.message,
        duration: 5000,
        isClosable: true,
        position: 'top-right',
        status: 'error'
      })
    }
  })
  const { data, write, isLoading, isIdle, isError } = useContractWrite(config)

  const waitForTransaction = useWaitForTransaction({
    hash: data?.hash,
    onSettled (data, error) {
      toast({
        title: 'Polygon claim published',
        description: data?.transactionHash,
        duration: 5000,
        isClosable: true,
        position: 'top-right',
        status: 'success'
      })
      const response = data ? data.logs[0].topics[1] : []
      console.log('Settled', response)
      setSettled(true)
      setTransactionHash(data?.transactionHash)
    }
  })

  return (
    <>


      {(!isPrepared) && <>
        <Text>Preparing(Publish with Polygon Identity)<Spinner /></Text>
      </>}
      {isPrepared && !isError && <Button
        colorScheme='blue'
        onClick={() => {
          write?.()
        }}
      >
        Publish with Polygon Identity {isLoading && isIdle && <Spinner />}
      </Button>}

      {settled && (
        <Flex gap={'10px'} flexDirection={'column'}>
          <Link
            color={'blue.400'}
            href={`https://mumbai.polygonscan.com/tx/${tranactionHash}`}
            isExternal
          >
            Go to transaction
          </Link>

          <Flex gap='10px' flexWrap={'wrap'}>
            <Text>Hash Index:</Text>
            <Text>{hashIndex}</Text>
          </Flex>
        </Flex>
      )}
    </>
  )
}
