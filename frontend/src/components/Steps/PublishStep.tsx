'use client'

import { Button, Center, Stack, useToast } from '@chakra-ui/react'
import { Proof } from '@reclaimprotocol/reclaim-sdk'

import publishWithDisco from '../../utils/publish-disco'
import { reclaimNetworksAddresses } from '../../reclaimNetworkAddresses'
// import ArbitrumAttestor from '../Attestors/ArbitrumAttestor'
// import OptimismAttestor from '../Attestors/OptimismAttestor'
import VeraxAttestor from '../Attestors/VeraxAttestor'

export function PublishStep ({ proof, chosenChain, provider }: { proof: Proof | undefined, chosenChain: keyof typeof reclaimNetworksAddresses, provider: any }) {
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


console.log(proof)
  return (
    <Center>
      <Stack h={'100%'} w={'xl'} gap={6}>
        <Button colorScheme='blue' onClick={handleDisco}>Publish With Disco</Button>
        {/* <Button colorScheme='blue'>Publish With Ceramic</Button> */}
        {chosenChain.includes('linea')  && <VeraxAttestor proof={proof} provider={provider?.value.providerId} />}
        {/* {chosenChain.includes('arb') && <ArbitrumAttestor proof={proof} provider={provider?.value.providerId} />}
        {chosenChain.includes('opt') && <OptimismAttestor proof={proof} provider={provider?.value.providerId} />} */}
      </Stack>
    </Center>
  )
}
