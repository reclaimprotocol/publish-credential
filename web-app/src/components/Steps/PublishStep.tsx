'use client'

import { Button, Center, Stack, useToast } from '@chakra-ui/react'
import { Proof } from '@reclaimprotocol/reclaim-sdk'

import publishWithDisco from '../../utils/publish-disco'
import { reclaimNetworksAddresses } from '../../reclaimNetworkAddresses'
import ArbitrumAttestor from '../Attestors/ArbitrumAttestor'
import OptimismAttestor from '../Attestors/OptimismAttestor'
import VeraxAttestor from '../Attestors/VeraxAttestor'
import PolygonAttestor from '../Attestors/PolygonAttestor'
import ArbVeraxAttestor from '../Attestors/ArbVeraxAttestor'

export function PublishStep({
  proof,
  chosenChain,
  provider
}: {
  proof: Proof | undefined
  chosenChain: keyof typeof reclaimNetworksAddresses
  provider: any
}) {
  const toast = useToast()
  const handleDisco = async () => {
    if (proof === undefined) return
    const { result, success } = await publishWithDisco(proof)
    if (success) {
      toast({
        title: 'Published with Disco',
        description: result.vc.id,
        duration: 40000,
        status: 'success',
        isClosable: true,
        position: 'top-right'
      })
    } else {
      toast({
        title: "Couldn't Published with Disco",
        description: '',
        duration: 4000,
        status: 'error',
        isClosable: true,
        position: 'top-right'
      })
    }
  }

  console.log(proof)
  return (
    <Center>
      <Stack h={'100%'} w={'xl'} gap={6}>
        {chosenChain.includes('Disco') && (
          <Button colorScheme='blue' onClick={handleDisco}>
            Publish With Disco
          </Button>
        )}
        {/* <Button colorScheme='blue'>Publish With Ceramic</Button> */}
        {chosenChain.includes('optimism-goerli') && (
          <VeraxAttestor proof={proof} provider={provider?.value.providerId} />
        )}
        {chosenChain.includes('arbitrum-one') && (
          <>
            <ArbitrumAttestor
              proof={proof}
              provider={provider?.value.providerId}
            />
            <ArbVeraxAttestor proof={proof} provider={provider?.value.providerId} />
          </>
        )}
        {chosenChain === 'optimism' && (
          <>
            <OptimismAttestor
              proof={proof}
              provider={provider?.value.providerId}
            />

          </>
        )}
        {chosenChain.includes('olygon') && (
          <PolygonAttestor
            proof={proof}
            chain={chosenChain}
            provider={provider?.value.providerId}
          />
        )}
      </Stack>
    </Center>
  )
}
