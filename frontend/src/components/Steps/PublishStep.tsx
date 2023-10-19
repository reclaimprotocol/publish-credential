'use client'

import { Button, Center, Stack, useToast } from '@chakra-ui/react'
import { Proof } from '@reclaimprotocol/reclaim-sdk'

import publishWithDisco from '../../utils/publish-disco'

export function PublishStep ({ proof }: { proof: Proof | undefined }) {
  const toast = useToast()
  const handleDisco = async()=>{
    if(proof === undefined)return;
    const {result, success} = await publishWithDisco(proof)
    if(success){
      toast({
        'title': 'Published with Disco',
        'description': result.vc.id,
        'duration': 40000,
        'status': 'success',
        'isClosable': true,
        'position': 'top-right'
      })
    }else{
      toast({
        title: "Couldn't Published with Disco",
        description: '',
        duration: 4000,
        status: 'error',
        isClosable: true,
        'position': 'top-right'
      })

    }
  }



  return (
    <Center>
      <Stack h={'100%'} w={'xl'} gap={6}>
        <Button colorScheme='blue' onClick={handleDisco}>Publish With Disco</Button>
        <Button colorScheme='blue'>Publish With Verax</Button>
        <Button colorScheme='blue'>Publish With Ceramic</Button>
        <Button colorScheme='blue'>Publish With Arbitrum EAS</Button>
        <Button colorScheme='blue'>Publish With Optimism EAS</Button>
      </Stack>
    </Center>
  )
}
