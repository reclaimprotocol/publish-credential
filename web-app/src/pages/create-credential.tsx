'use client'
import { Connected } from '../components/Connected'
import Navbar from '../components/Navbar'
import { Center, Flex, Stack, Container } from '@chakra-ui/layout'
import { CustomStepper } from '../components/CustomStepper'

export default function Page() {

  return (
    <>
      <Navbar showConnectWalletButton />
      <Connected>
        <Center>
          <Container mt={12} maxWidth={'container.lg'}>
            <CustomStepper />
          </Container>
        </Center>
      </Connected>
    </>
  )
}
