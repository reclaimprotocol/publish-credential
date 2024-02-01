'use client'

import { useState } from 'react'
import { Proof } from '@reclaimprotocol/reclaim-sdk'
import { Flex, Text } from '@chakra-ui/layout'
import QRCode from 'react-qr-code'
import { Spinner, Center, useToast, Button } from '@chakra-ui/react'
import { providerType } from '../../utils/types'
import { ReclaimClient } from '@reclaimprotocol/js-sdk'

type Props = {
  selectedProvider: providerType | undefined
  handleSetProof: (proof: Proof) => void
}

export function ProveClaimStep ({ selectedProvider, handleSetProof }: Props) {
  const toast = useToast()
  const [isProofReceived, setIsProofReceived] = useState(false)
  const [verificationReq, setVerificationReq] = useState<any>(undefined)
  const [proofObj, setProofObj] = useState<Proof>()

  const getSignature = async (requestedProofs: any) => {
    const res = await fetch('/api/getSignature', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        requestedProofs
      })
    })

    if(res.ok){
      const data  = await res.json()
      return data.signature
    }else{
      const data = await res.json()
      toast({
        title: 'Error',
        description: data.error,
        duration: 4000,
        status: 'error',
        isClosable: true,
        position: 'top-right'
      })
      
    }

    
  }

  const getVerificationReq = async () => {
    const APP_ID = '0x9B5fc54c81Af20687d9C83ff36FD8450dB812ba6'
    const reclaimClient = new ReclaimClient(APP_ID)
    const providers = [selectedProvider?.label]
    const providerV2 = await reclaimClient.buildHttpProviderV2ByName(providers)
    const requestProofs = await reclaimClient.buildRequestedProofs(
      providerV2,
      await reclaimClient.getAppCallbackUrl()
    )

    reclaimClient.setSignature(await getSignature(requestProofs))

    const reclaimReq = await reclaimClient.createVerificationRequest(providers)
    setVerificationReq(reclaimReq)
    console.log('req', reclaimReq.template)
    const url = await reclaimReq.start()
    console.log(url)
    reclaimReq.on('success', (data: any) => {
      if (data) {
        const proofs = data
        setIsProofReceived(true)
        setProofObj(proofs[0])
        handleSetProof(proofs[0])
        toast({
          title: 'Proof received',
          duration: 4000,
          status: 'success',
          isClosable: true,
          position: 'top-right'
        })
      }
    })
    reclaimReq.on('error', (data: any) => {
      if (data) {
        const proofs = data
        // TODO: update business logic based on proof generation failure
      }
    })
  }

  return (
    <>
      {isProofReceived && (
        <Center>
          <Text fontSize={'2xl'}>
            We got your proof! Please Continue to the final Step...
          </Text>
        </Center>
      )}
      {!isProofReceived && verificationReq?.template && (
        <>
          <Text>
            Scan/Click the QR code to be redirected to Reclaim Wallet.
          </Text>

          <Flex justifyContent={'center'}>
            <a
              href={verificationReq.template}
              target='_blank'
              rel='noopener noreferrer'
              title={verificationReq.template}
            >
              <QRCode
                size={320}
                value={verificationReq.template}
                fgColor='#000'
                bgColor='#fff'
                className='QR-resize'
              />
            </a>
          </Flex>
        </>
      )}
      {!isProofReceived && verificationReq && (
        <Flex flex='1' width='full' justifyContent='center'>
          <Spinner />
          <Text>Listening to get your proof </Text>
        </Flex>
      )}
      {!isProofReceived && !verificationReq && (
        <Flex flex='1' width='full' justifyContent='center'>
          <Button onClick={getVerificationReq}>Start Listening to get your proof </Button>
        </Flex>
      )}
    </>
  )
}
