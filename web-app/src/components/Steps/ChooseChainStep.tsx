'use client'
import { Select, useToast } from '@chakra-ui/react'
import { reclaimNetworksAddresses } from '../../reclaimNetworkAddresses'
import { ChangeEvent, useEffect } from 'react'
import { useNetwork, useSwitchNetwork } from 'wagmi'

type SupportedNetworkDropDownProps = {
  setChosenChain: React.Dispatch<
    React.SetStateAction<
      keyof typeof reclaimNetworksAddresses
    >
  >
}

export const ChooseChainStep = ({
  setChosenChain
}: SupportedNetworkDropDownProps) => {
  const { chain } = useNetwork()
  const { chains, error, isLoading, pendingChainId, switchNetwork } =
    useSwitchNetwork()

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
