'use client'

import { ChakraProvider } from '@chakra-ui/react'
import { ConnectKitProvider } from 'connectkit'
import * as React from 'react'
import { WagmiConfig } from 'wagmi'

import { config } from '../wagmi'

export function Providers({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = React.useState(false)
  React.useEffect(() => setMounted(true), [])
  return (
    <WagmiConfig config={config}>
      <ChakraProvider>
      <ConnectKitProvider>{mounted && children}</ConnectKitProvider>
      </ChakraProvider>
    </WagmiConfig>
  )
}
