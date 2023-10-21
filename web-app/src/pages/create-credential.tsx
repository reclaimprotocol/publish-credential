'use client'
import { Connected } from '../components/Connected'
import Navbar from '../components/Navbar'
import { Center, Flex, Stack } from '@chakra-ui/layout'
import { CustomStepper } from '../components/CustomStepper'

export default function Page () {
  
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
