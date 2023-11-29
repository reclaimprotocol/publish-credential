'use client'
import { Select, useToast } from '@chakra-ui/react'
import { reclaimNetworksAddresses } from '../../reclaimNetworkAddresses'
import { ChangeEvent, useEffect, useState } from 'react'
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
  const [currentChain, setCurrentChain] =
    useState<keyof typeof reclaimNetworksAddresses>('polygon-mumbai')
  const toast = useToast()
  // console.log('chai11n', reclaimNetworksAddresses)
  useEffect(() => {
    let chainName = 'polygon-mumbai'
    Object.entries(reclaimNetworksAddresses).forEach(([key, value], _) => {
      // console.log('key', key)
      // console.log('value', value)
      // console.log('chain', chain?.id)
      // console.log('chainId', value['chainId'])
      if ((value['chainId'] as any) === chain?.id) {
        chainName = key
      }
    })
    // console.log('chain', chainName)
    //@ts-ignore
    setCurrentChain(chainName)
    //@ts-ignore
    setChosenChain(chainName)
  }, [chain])

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
      if (
        !schema &&
        (event.target.value === 'polygon-mumbai' ||
          event.target.value === 'polygon-mainnet')
      ) {
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
      <Select
        width='60%'
        onChange={handleChange}
        defaultValue={currentChain}
        value={currentChain}
      >
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
