import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Spinner,
  VStack,
  HStack,
  Text,
  Container,
  Divider
} from '@chakra-ui/react'
import { useContractRead } from 'wagmi'
import { useState } from 'react'
import RECLAIM_WITH_IDENTITY from '../../IdentityWithReclaim.json'
import { reclaimNetworksAddresses } from '../../reclaimNetworkAddresses'

export function PolygonModal ({ hashIndex }: { hashIndex: string | undefined }) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [data, setData] = useState<any>(null)

  const { isError, isLoading, isSuccess, error } = useContractRead({
    enabled: hashIndex !== undefined,
    address: '0x169fe90cd62ca36500caea06c50fb7002a00a074',
    chainId: reclaimNetworksAddresses['polygon-mumbai']['chainId'],
    functionName: 'getClaimProof',
    abi: RECLAIM_WITH_IDENTITY.abi,
    args: [hashIndex],
    onSuccess (data) {
      setData(data)
      console.log(data)
    }
  })

  return (
    <>
      <Button onClick={onOpen}>Retrieve Proof from Polygon</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Proof From polygon</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {isError && error?.message}
            {isLoading && <Spinner />}
            {isSuccess && (
              <>
                <VStack>
                  {data !== undefined && Object.entries(data).map((value, key, _) => {
                    console.log(value)
                    console.log(key)
                    return (
                      <Container key={key}>
                        <Text fontSize='small'>{value[0]}</Text>
                        <Text>{value[1].toString() as string|string[]}</Text>
                        <Divider />
                      </Container>
                    )
                  })}
                </VStack>
              </>
            )}

            {isError && <Text>Error happened when retrieving the proof</Text>}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
