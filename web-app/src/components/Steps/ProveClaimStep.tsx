'use client'

import { useEffect, useState } from 'react'
import { Proof } from '@reclaimprotocol/reclaim-sdk'
import { useAccount } from 'wagmi'
import { Divider, Flex, Text } from '@chakra-ui/layout'
import QRCode from 'react-qr-code'
import { Spinner, Center, useToast } from '@chakra-ui/react'
import { providerType } from '../../utils/types'

const backendBase = '/api'
const backendTemplateUrl = `${backendBase}/prove`
const backendProofUrl = `${backendBase}/get-proof`

export function ProveClaimStep({
  selectedProvider,
  handleSetProof
}: {
  selectedProvider: providerType | undefined
  handleSetProof: (proof: Proof) => void
}) {
  const toast = useToast()
  const { address } = useAccount()
  const [template, setTemplate] = useState('')
  const [isLoadingTemplate, setIsLoadingTemplate] = useState(false)
  const [isTemplateOk, setIsTemplateOk] = useState(true)
  const [isProofReceived, setIsProofReceived] = useState(false)
  const [proofObj, setProofObj] = useState<Proof>()
  const [callbackId, setCallbackId] = useState('')

  useEffect(() => {
    if (selectedProvider === undefined) return
    if (!isProofReceived) {
      console.log('Starting to fetch template.')
      handleGetTemplate()
      const intervalId = setInterval(fetchProof, 5000)
      return () => {
        console.log('Template received/Remounted.')
        clearInterval(intervalId)
      }
    }
  })

  const fetchProof = async () => {
    if (isLoadingTemplate) {
      console.log('Template is still loading.')
      return
    }
    try {
      console.log(`Requesting ${backendProofUrl}?id=${callbackId}`)
      const response = await fetch(`${backendProofUrl}?id=${callbackId}`)
      if (response.status === 200) {
        const proofData = await response.json()
        setIsProofReceived(true)
        setProofObj(proofData[0])
        handleSetProof(proofData[0])
        toast({
          title: 'Proof received',
          duration: 4000,
          status: 'success',
          isClosable: true,
          position: 'top-right'
        })
      }
    } catch (error) {
      setIsProofReceived(false)
      console.log(error)
    }
  }
  console.log(proofObj)
  const handleGetTemplate = async () => {
    if (isTemplateOk && template) {
      console.log('The template is already received.')
      return
    }
    setIsLoadingTemplate(true)
    try {
      console.log(`Requesting ${backendTemplateUrl}?userAddr=${address}`)
      const response = await fetch(
        `${backendTemplateUrl}?userAddr=${address}&provider=${JSON.stringify(
          selectedProvider
        )}`
      )
      if (response.ok) {
        const data = await response.json()
        if (data?.error) {
          console.log(data.error)
          throw new Error(data.error)
        }
        console.log('Here', data)
        setCallbackId(data.callbackId)
        setTemplate(data.reclaimUrl)
        setIsTemplateOk(true)
        console.log('The template generated is: ', template)
      } else {
        setIsTemplateOk(false)
        setTemplate(
          'Error: Unable to receive a valid template from the backend. Check if it is up and running. Please try again later.'
        )
      }
    } catch (error) {
      setIsTemplateOk(false)
      setTemplate('Error: ' + error)
      console.log(error)
    }
    setIsLoadingTemplate(false)
    return
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
      {!isProofReceived && template && isTemplateOk && (
        <>
          <Text>
            Scan/Click the QR code to be redirected to Reclaim Wallet.
          </Text>

          <Flex justifyContent={'center'}>
            <a
              href={template}
              target='_blank'
              rel='noopener noreferrer'
              title={template}
            >
              <QRCode
                size={128}
                value={template}
                fgColor='#000'
                bgColor='#fff'
                className='QR-resize'
              />
            </a>
          </Flex>
        </>
      )}
      {!isProofReceived && isTemplateOk && (
        <Flex flex='1' width='full' justifyContent='center'>
          <Spinner />
          <Text>Listening to get your proof </Text>
        </Flex>
      )}
      {!isTemplateOk && (
        <Flex flex='1' width='full' justifyContent='center'>
          <Spinner />
          <Text>Loading QR Code Template</Text>
        </Flex>
      )}
    </>
  )
}
