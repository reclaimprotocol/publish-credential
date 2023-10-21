'use client'
import { useState } from 'react'
import { Connected } from '../components/Connected'
import Navbar from '../components/Navbar'
import ProviderSelectInput from '../components/ProviderSelectInput'
import { providerType } from '../utils/types'
import { Center, Container, Flex, Stack } from '@chakra-ui/layout'
import { CustomStepper } from '../components/CustomStepper'

export default function Page () {
  const [selectedProviders, setSelectedProviders] = useState<providerType[]>([])

  const handleSelectChange = (selected: any) => {
    setSelectedProviders(selected)
  }

  return (
    <>
      <Navbar showConnectWalletButton />
      <Connected>
        <Center>
          <Flex width='4xl'>
            <Stack py={10} width='100%' justifyContent={'center'} gap={16}>
              <CustomStepper />
            </Stack>
          </Flex>
        </Center>
      </Connected>
    </>
  )
}
