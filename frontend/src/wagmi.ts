import { getDefaultConfig } from 'connectkit'
import { createConfig } from 'wagmi'

const walletConnectProjectId = '6be37cda619abec4b33405f0a4bfd410'

export const config = createConfig(
  getDefaultConfig({
    autoConnect: true,
    appName: 'Publish Credintials - Reclaim',
    walletConnectProjectId,
  })
)
