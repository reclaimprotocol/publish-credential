import { Proof } from '@reclaimprotocol/reclaim-sdk'
import { useEffect, useState } from 'react'
import { ethers } from 'ethers'
import {
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction
} from 'wagmi'
import { reclaimNetworksAddresses } from '../../reclaimNetworkAddresses'
import RECLAIM_WITH_IDENTITY from '../../IdentityWithReclaim.json'
import { Button, Flex, Spinner, Text, useToast, Link } from '@chakra-ui/react'
import { PolygonModal } from './PolygonModal'
import encodePolygonIdClaim from '../../utils/encode-polygonid-claim'
import { getSchemaAndUidPolygon } from '../../utils/get-pid-schemas'

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
  const [isClicked, setIsClicked] = useState(false)

  const [settled, setSettled] = useState(false)
  const toast = useToast()
  useEffect(() => {
    if (proof == undefined) return
    const { schema } = getSchemaAndUidPolygon(provider)
    if (!schema) {
      toast({
        title: 'Provider not Supported',
        description: 'Please contact the issuer',
        status: 'error',
        duration: 9000,
        isClosable: true
      })
      return
    }
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
    const utf8EncodeText = new TextEncoder()

    setProofReq(proofReqBef)

    const params =
      proof.extractedParameterValues == undefined
        ? JSON.parse(proof.parameters as string)
        : proof.extractedParameterValues

    const setHindexAndValue = async () => {
      const { hIndex, hValue } = await encodePolygonIdClaim(
        params,
        provider,
        schema as string
      )
      setHashIndex(hIndex.toString())
      setHashValue(hValue.toString())
    }
    setHindexAndValue()
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
      setIsClicked(false)
    }
  })

  return (
    <>
      {!isPrepared && (
        <>
          <Text>
            Preparing(Publish with Polygon Identity)
            <Spinner />
          </Text>
        </>
      )}
      {isPrepared && !isError && (
        <Button
          disabled={isClicked}
          colorScheme='blue'
          onClick={() => {
            write?.()
            setIsClicked(true)
          }}
        >
          Publish with Polygon Identity {isLoading && <Spinner />}
        </Button>
      )}

      {settled && (
        <Flex gap={'10px'} flexDirection={'column'}>
          <PolygonModal hashIndex={hashIndex} />
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
