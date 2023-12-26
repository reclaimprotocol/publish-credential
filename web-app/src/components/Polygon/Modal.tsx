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
  VStack
} from '@chakra-ui/react'

import { useEffect, useState } from 'react'
import SigninPolygon from './Signin'

export function PolygonModal() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  useEffect(() => {
    onOpen()
  }, [])

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent width={'280px'} height={'400px'} borderRadius={10}>
          <ModalHeader>Connect polygon wallet</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack>
              <SigninPolygon />
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}
