import { useEffect, useState } from 'react'
import { getSchemaAndUid } from '../../utils/get-schema-uid'
import ARBITRUM_EAS from '../../contracts-artifacts/arbitrum-one/EAS.json'
import { useAccount, useContractWrite, usePrepareContractWrite, useWaitForTransaction } from 'wagmi'
import { Button, Link, Spinner, Text, useToast } from '@chakra-ui/react'
import { Proof } from '@reclaimprotocol/reclaim-sdk'
import { getToPublishEASData } from '../../utils/publish-eas'
import { ethers } from 'ethers'
import { AttestationRequest } from '@ethereum-attestation-service/eas-sdk'
import { reclaimNetworksAddresses } from '../../reclaimNetworkAddresses'


export default function ArbitrumAttestor ({ provider,
  proof
}: {
  provider: string
  proof: Proof | undefined
}) {
  const toast = useToast()
  const [attestationId, setAttestationId] = useState<string | undefined>(undefined)
  const [schema, setSchema] = useState<string | undefined>()
  const [UID, setUID] = useState<string | undefined>()
  const [enabled, setEnabled] = useState<boolean>(false)
  // const etherAmount = ethers.parseEther('0.0005')
  const [attestationData, setAttestationData] =
    useState<AttestationRequest | null>(null)
  const { address } = useAccount()

  console.log(proof)
  useEffect(() => {
    console.log('z', ethers.ZeroAddress)
    if (proof == undefined) return
    const schemaInfo = getSchemaAndUid(provider)
    console.log(schemaInfo)
    if (!schemaInfo.schema) return
    console.log(schemaInfo)
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

  const { config } =
    usePrepareContractWrite({
      enabled: enabled,
      //@ts-ignore
      address: ARBITRUM_EAS.address,
      abi: ARBITRUM_EAS.abi,
      functionName: 'attest',
      chainId: reclaimNetworksAddresses['arbitrum-one']['chainId'],
      args: [attestationData],
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
  const { data, write, isLoading, isSuccess, isError, error } = useContractWrite(config)
  console.log(data)
  const waitForTransaction = useWaitForTransaction({
    hash: data?.hash,
    onSettled (data, error) {
      toast({
        'title':'Attestation published',
        description:'EAS registered your attestation',
        duration:5000,
        isClosable:true,
        position:'top-right',
        status:'success'
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
        Publish with Arbitrum EAS{isLoading && <Spinner />}
      </Button>
      {isError && <Text>{error?.message ?? 'Error'}</Text>}
      {attestationId !== undefined && <Link
        color={'blue.400'}
        href={`https://arbitrum.easscan.org/attestation/view/${attestationId}`}
        isExternal
      >View on EASscan</Link>}
    </>
  )
}
