import { Button, Spinner, useToast } from '@chakra-ui/react'
import { Proof } from '../../utils/types'
import { useEffect, useState } from 'react'
import {
  useAccount,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction
} from 'wagmi'
import { abi } from '../../contracts-artifacts/aurora/nft'
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
  const [tokenUri, setTokenUri] = useState<any>()
  const toast = useToast()

  useEffect(() => {
    // if (proof == undefined) return
    const proofReq = {
        claimInfo: {
          context: '',
          parameters: '{"uid":"673906874713"}',
          provider: 'uidai-uid'
        },
        signedClaim: {
          claim: {
            epoch: 2,
            identifier:
              '0xafb5c7415e79bbf42b122d3c0d02d7b8da9deb04df933b95318b57483d587ae3',
            owner: '0xdFb1dCADeeEC3273Fb2C50563312D1d5f7347615',
            timestampS: '1697188555'
          },
          signatures: [
            '0x17a4133c87ebe482a33607486b5014b9cc92890cdd862db405dbcaf1b96112f829a87d411d8fd25fcd408c021e87e345457d251f8b8afdb13476ca89b8aa80c31b'
          ]
        }
    }
    setproofRequest(proofReq)

    const genTokenUri = async () => {
      try {
        const params = Object.entries({ uid: '673906874713' }).map(
          ([key, value]) => value
        )

        const response = await fetch('/api/reclaim-nft', {
          method: 'POST',
          body: JSON.stringify({ providerName: provider, parameters: params }),
          headers: {
            'Content-Type': 'application/json'
          }
        })
        const data = await response.json()
        setTokenUri('https://publish-credentials.reclaimprotocol.org/' + data.tokenUri)
        console.log(data)
      } catch (e) {
        console.log(e)
      }
    }

    genTokenUri()
    setIsPrepared(true)
  }, [proof, address, provider, tokenUri])

  

  const contractAddress = '0xCc08210D8f15323104A629a925E4cc59D0fa2Fe1'
  console.log(!tokenUri ?? 'undefined')
  
  const { config } = usePrepareContractWrite({
    enabled: !tokenUri,
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
        title: 'Attestation published',
        description: 'Registered your attestation',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
        status: 'success'
      })
      const response = data?.transactionHash
      console.log('Settled', data)
      setTxHash(response as any)
    }
  })

  return (
    <>
      <Button
        colorScheme='blue'
        onClick={() => {
          write?.()
        }}
      >
        Publish (Mint NFT) {isLoading && <Spinner />}
      </Button>
      {txHash && (
        <Link
          href={`https://explorer.testnet.aurora.dev/tx/${txHash}`}
          target='_blank'
        />
      )}
    </>
  )
}
