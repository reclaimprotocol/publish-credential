import { useEffect, useState } from 'react'
import { getSchemaAndUid } from '../../utils/get-schema-uid'
import EASWithReclaim from '../../contracts-artifacts/optimism/EASWithReclaim.json'
import {
  useAccount,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction
} from 'wagmi'
import { Button, Spinner, Text, useToast, Link } from '@chakra-ui/react'
import { Proof } from '@reclaimprotocol/reclaim-sdk'
import { getToPublishEASData } from '../../utils/publish-eas'
import { ethers } from 'ethers'
import { AttestationRequest } from '@ethereum-attestation-service/eas-sdk'
import { reclaimNetworksAddresses } from '../../reclaimNetworkAddresses'

export default function OptimismAttestor ({
  provider,
  proof
}: {
  provider: string
  proof: Proof | undefined
}) {
  const toast = useToast()
  const [schema, setSchema] = useState<string | undefined>()
  const [UID, setUID] = useState<string | undefined>()
  const [enabled, setEnabled] = useState<boolean>(false)
  const [settled, setSettled] = useState<boolean>(false)
  const [attestationId, setAttestationId] = useState<string | undefined>(
    undefined
  )

  const etherAmount = ethers.parseEther('0')
  const [attestationData, setAttestationData] =
    useState<AttestationRequest | null>(null)

  const [proofReq, setProofReq] = useState<any>(null)

  const { address } = useAccount()

  console.log(proof)
  useEffect(() => {
    if (proof == undefined) return
    const proofData = {
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
    setProofReq(proofData as any)
    const schemaInfo = getSchemaAndUid(provider)
    if (!schemaInfo.schema) return
    setSchema(schemaInfo.schema as string)
    setUID(schemaInfo.uid as string)
    const setter = async () => {
      const data = await getToPublishEASData(
        proof,
        schemaInfo.schema as string,
        schemaInfo.uid as string,
        //@ts-ignore
        address
      )
      setEnabled(true)
      setAttestationData(data)
    }
    setter()
  }, [proof, provider, address])

  const { config } = usePrepareContractWrite({
    enabled: enabled,
    //@ts-ignore
    address: EASWithReclaim.address,
    abi: EASWithReclaim.abi,
    functionName: 'attest',
    chainId: reclaimNetworksAddresses['optimism']['chainId'],
    args: [attestationData, proofReq],
    // overrides:{ value: etherAmount},
    onSuccess (data) {
      console.log('Successfully Prepared')
    },
    onError (error) {
      console.log('Error in Prepare')
      console.log(error)
      console.log(attestationData)
    }
  })
  const { data, write, isLoading, isSuccess, isError, error } =
    useContractWrite(config)

  console.log(data)
  const waitForTransaction = useWaitForTransaction({
    hash: data?.hash,
    onSettled (data, error) {
      toast({
        title: 'Attestation published',
        description: 'EAS registered your attestation',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
        status: 'success'
      })
      console.log(data?.logs)
      const response = data ? data.logs[0].data : undefined
      console.log('Settled', response)
      setAttestationId(response as string)
    }
  })

  if (proof == undefined) return null
  return (
    <>
      <Button
        disabled={isSuccess}
        colorScheme='blue'
        onClick={() => {
          write?.()
        }}
      >
        Publish with Optimism EAS{isLoading && <Spinner />}
      </Button>
      {isError && <Text>{error?.message ?? 'Error'}</Text>}
      {attestationId !== undefined && (
        <Link
          color={'blue.400'}
          href={`https://optimism.easscan.org/attestation/view/${attestationId}`}
          isExternal
        >
          View on EASscan
        </Link>
      )}
    </>
  )
}
