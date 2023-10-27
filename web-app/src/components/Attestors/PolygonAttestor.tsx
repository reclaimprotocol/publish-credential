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
import { Button, Spinner } from '@chakra-ui/react'

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
      console.log('Successful - register prepare: ', data)
    },
    onError (error) {
      console.log(error)
    }
  })
  const { data, write, isLoading } = useContractWrite(config)

  return (<>
    <Button
      colorScheme='blue'
      onClick={() => {
        write?.()
      }}
    >
      Publish with Polygon Identity {isLoading && <Spinner />}
    </Button>
  </>)
}
