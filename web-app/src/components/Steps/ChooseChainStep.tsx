'use client'
import { Select, useToast } from '@chakra-ui/react'
import { reclaimNetworksAddresses } from '../../reclaimNetworkAddresses'
import { ChangeEvent, useEffect } from 'react'
import { useNetwork, useSwitchNetwork } from 'wagmi'
import { getSchemaAndUidPolygon } from '../../utils/get-pid-schemas'

type SupportedNetworkDropDownProps = {
  setChosenChain: React.Dispatch<
    React.SetStateAction<keyof typeof reclaimNetworksAddresses>
  >
  provider: string
}

export const ChooseChainStep = ({
  setChosenChain,
  provider
}: SupportedNetworkDropDownProps) => {
  const { chain } = useNetwork()
  const { error, switchNetwork } = useSwitchNetwork()

  const toast = useToast()

  useEffect(() => {
    if (error != null && error.message !== undefined) {
      toast({
        title: 'Please try again!',
        description: error.message,
        status: 'error',
        duration: 4000,
        isClosable: true,
        position: 'top-right'
      })
    }
  }, [error])

  const handleChange = async (event: ChangeEvent<HTMLSelectElement>) => {
    if (switchNetwork === undefined) return
    setChosenChain(event.target.value as any)
    //@ts-ignore
    const networkDetails = reclaimNetworksAddresses[event.target.value]
    if (networkDetails['chainId'] !== chain?.id) {
      try {
        if (networkDetails['chainId'] !== -1)
          switchNetwork(networkDetails['chainId'])
      } catch (error) {
        toast({
          title: 'Please try again!',
          description: '',
          status: 'error',
          duration: 4000,
          isClosable: true,
          position: 'top-right'
        })
      }

      const { schema } = getSchemaAndUidPolygon(provider)
      if (!schema && event.target.value === 'polygon-mumbai') {
        toast({
          title: 'Provider not Supported',
          description: 'Please contact the issuer',
          status: 'error',
          duration: 9000,
          isClosable: true
        })
        return
      }
    }
  }

  return (
    <>
      <Select width='60%' onChange={handleChange} defaultValue='polygon-mumbai'>
        {Object.entries(reclaimNetworksAddresses).map((v, index, _) => {
          return (
            <option value={v[0]} key={v[0]}>
              {v[1]['name'] as string}
            </option>
          )
        })}
      </Select>
    </>
  )
}
