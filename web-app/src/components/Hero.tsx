'use client'

import {
  Box,
  Heading,
  Container,
  Text,
  Button,
  Stack,
  Icon,
  useColorModeValue,
  createIcon,
  Image,
  Spinner,
  Center
} from '@chakra-ui/react'
import { ConnectKitButtonCustom } from '../components/ConnectKitButton'
import { useAccount } from 'wagmi'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Hero () {
  const { isConnected } = useAccount()
  const router = useRouter()
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    if (isConnected) {
      setLoading(true)
      setTimeout(() => {
        router.push('/create-credential')
      }, 2000)
    }
  }, [isConnected])

  return (
    <>
      {loading ? (
        <>
          <Center>
            <Spinner
                zIndex={100}
                thickness = '4px'
                speed = '0.65s'
                emptyColor = 'gray.200'
                color = 'blue.600'
                size = 'xl'
                label = 'Loading...'
                position={'absolute'}
                top={'100%'}
                left={'48%'}
            />
            <Text p={2}>
                Navigating to Create Credential Page....
            </Text>
          </Center>
        </>
      ) : (
        <>
          <Container maxW={'3xl'}>
            <Image
              src='./reclaim_hero.png'
              alt='Reclaim Hero Section Image'
              padding={0}
            />
            <Stack as={Box} textAlign={'center'} spacing={{ base: 4, md: 10 }}>
              <Heading
                fontWeight={600}
                fontSize={{ base: '2xl', sm: '4xl', md: '6xl' }}
                lineHeight={'100%'}
              >
                Elevate accessibility with <br />
                <Text as={'span'} color={'blue.500'}>
                  Credential Publisher
                </Text>
              </Heading>
              <Stack
                direction={'column'}
                p={0}
                align={'center'}
                alignSelf={'center'}
                position={'relative'}
              >
                <ConnectKitButtonCustom />
              </Stack>
            </Stack>
          </Container>
        </>
      )}
    </>
  )
}
