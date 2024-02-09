import { Button, Spinner, useToast } from '@chakra-ui/react'
import { Proof } from '../../utils/types'
import { useEffect, useState } from 'react'
import {
  useAccount,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction
} from 'wagmi'
import {abi} from '../../contracts-artifacts/aurora/nft'
import Link from 'next/link'


export default function AuroraReclaimNFT ({
  provider,
  proof
}: {
  provider: string
  proof: Proof | undefined
}) {
  const { address } = useAccount()
  const [isPrepared, setIsPrepared] = useState(false)
  const [txHash, setTxHash] = useState(null)

  const [proofRequest, setproofRequest] = useState<any>(null)
  const [tokenUri, setTokenUri] = useState<any>(null)
  const toast = useToast()

  useEffect(() => {
    if (proof == undefined) return
    const proofReq = {
      claimInfo: {
        provider: proof.claimData.provider,
        context: proof.claimData.context,
        parameters: proof.claimData.parameters
      },
      signedClaim: {
        signatures: proof.signatures,
        claim: {
          identifier: proof.identifier,
          owner: proof.claimData.owner,
          timestampS: proof.claimData.timestampS,
          epoch: proof.claimData.epoch
        }
      }
    }
    setproofRequest(proofReq)


    const genTokenUri = async () => {
        try{
            const params = Object.entries(proof.extractedParameterValues).map(([key, value]) => value)

            const response = await fetch('/api/reclaim-nft', {
                method: 'POST',
                body: JSON.stringify({providerName: provider, parameters: params}),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const data = await response.json()
            setTokenUri(data.tokenUri)
            console.log(data)

        }catch(e){
            console.log(e)
        }
    }

    genTokenUri()
    
  }, [proof, address, provider])

  const contractAddress = '0xCc08210D8f15323104A629a925E4cc59D0fa2Fe1'

  //@ts-ignore
  const { config } = usePrepareContractWrite({
    address: contractAddress,
    abi: abi,
    functionName: 'mint',
    args: [tokenUri, proofRequest],
    chainId: 1313161555,
    onSuccess (data) {
      console.log('Successful - register prepare: ', data)
      setIsPrepared(true)
    },
    onError (error) {
      console.log(error)
    }
  })

  const { data, write, isLoading } = useContractWrite(config)
  const waitForTransaction = useWaitForTransaction({
    hash: data?.hash,
    onSettled (data, error) {
      toast({
        'title':'Attestation published',
        description:'Registered your attestation',
        duration:5000,
        isClosable:true,
        position:'top-right',
        status:'success'
      })
      const response = data?.transactionHash
      console.log('Settled', data)
      setTxHash(response as any)
    }
  })

  return (
    <>
      <Button colorScheme = 'blue' onClick={()=>{write?.()}}>Publish (Mint NFT) {isLoading && <Spinner />}</Button>
      {txHash && <Link href={`https://explorer.testnet.aurora.dev/tx/${txHash}`} target='_blank' />}
    </>
  )
}
