'use client'

import { Button, Center, Stack } from '@chakra-ui/react'
import { Proof } from '@reclaimprotocol/reclaim-sdk'

export function PublishStep ({ proof }: { proof: Proof }) {
  return (
    <Center>
      <Stack h={'100%'} w={'xl'} gap={6}>
        <Button colorScheme='blue'>Publish With Disco</Button>
        <Button colorScheme='blue'>Publish With Verax</Button>
        <Button colorScheme='blue'>Publish With Ceramic</Button>
        <Button colorScheme='blue'>Publish With Arbitrum EAS</Button>
        <Button colorScheme='blue'>Publish With Optimism EAS</Button>
      </Stack>
    </Center>
  )
}
