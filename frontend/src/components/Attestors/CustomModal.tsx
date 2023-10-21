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
import { ethers } from 'ethers'

type attestAtionDataType = {
  attestationData: string
  attestationId: string
  attestedDate: number
  attester: string
  expirationDate: number
  portal: string
  replacedBy: string
  revocationDate: number
  revoked: boolean
  schemaId: string
  subject: string
  version: number
}

export function CustomModal ({ attestationId }: { attestationId: string }) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [data, setData] = useState<attestAtionDataType | null>(null)

  const { isError, isLoading, isSuccess } = useContractRead({
    address: '0x345ad20d8c6a84ee43d9713aee17e0f1a0183571',
    chainId: 420,
    functionName: 'getAttestation',
    abi: [
      {
        inputs: [
          {
            internalType: 'bytes32',
            name: 'attestationId',
            type: 'bytes32'
          }
        ],
        name: 'getAttestation',
        outputs: [
          {
            components: [
              {
                internalType: 'bytes32',
                name: 'attestationId',
                type: 'bytes32'
              },
              {
                internalType: 'bytes32',
                name: 'schemaId',
                type: 'bytes32'
              },
              {
                internalType: 'bytes32',
                name: 'replacedBy',
                type: 'bytes32'
              },
              {
                internalType: 'address',
                name: 'attester',
                type: 'address'
              },
              {
                internalType: 'address',
                name: 'portal',
                type: 'address'
              },
              {
                internalType: 'uint64',
                name: 'attestedDate',
                type: 'uint64'
              },
              {
                internalType: 'uint64',
                name: 'expirationDate',
                type: 'uint64'
              },
              {
                internalType: 'uint64',
                name: 'revocationDate',
                type: 'uint64'
              },
              {
                internalType: 'uint16',
                name: 'version',
                type: 'uint16'
              },
              {
                internalType: 'bool',
                name: 'revoked',
                type: 'bool'
              },
              {
                internalType: 'bytes',
                name: 'subject',
                type: 'bytes'
              },
              {
                internalType: 'bytes',
                name: 'attestationData',
                type: 'bytes'
              }
            ],
            internalType: 'struct Attestation',
            name: '',
            type: 'tuple'
          }
        ],
        stateMutability: 'view',
        type: 'function'
      }
    ],
    args: [attestationId],
    onSuccess (data) {
      setData(data as attestAtionDataType)
    }
  })

  return (
    <>
      <Button onClick={onOpen}>Retrieve Attestation from Verax</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Attestation Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {isLoading && <Spinner />}
            {isSuccess && (
              <>
                <VStack>
                  {Object.entries(data!).map((value, key, n) => {
                    if (value[0] == 'expirationDate') return <></>
                    if (value[0] == 'revoked') return <></>
                    if (value[0] == 'revocationDate') return <></>
                    if (value[0] == 'attestedDate') return <></>
                    if (value[0] == 'version') return <></>
                    return (
                      <Container key={key}>
                        <Text fontSize='small'>{value[0]}</Text>
                        <Text>{value[1]}</Text>
                        <Divider />
                      </Container>
                    )
                  })}
                </VStack>
              </>
            )}

            {isError && (
              <Text>Error happened when retrieving the attestation data</Text>
            )}
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
