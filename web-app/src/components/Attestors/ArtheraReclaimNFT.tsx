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


export default function ArtheraReclaimNFT ({
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
  const [tokenUri, setTokenUri] = useState<string | undefined>()
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
            setTokenUri(data.tokenURI)

        }catch(e){
            console.log(e)
        }
    }

    genTokenUri()
    
  }, [proof, address, provider])

  const contractAddress = '0x9e4A9F3297c89D3F5CD64B020CE9B51953cAb456'

  
  const { config } = usePrepareContractWrite({
    enabled: tokenUri !== undefined,
    address: contractAddress,
    abi: abi,
    functionName: 'mint',
    args: [tokenUri, proofRequest],
    chainId: 10242,
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
      {txHash && <Link href={`https://explorer.arthera.net/tx/${txHash}`} target='_blank'>View on Block Explorer</Link>}
    </>
  )
}
