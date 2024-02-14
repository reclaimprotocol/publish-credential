import { getDefaultConfig } from 'connectkit'
import { arbitrum, arbitrumGoerli, lineaTestnet, auroraTestnet, optimism, polygon, polygonMumbai, optimismGoerli} from 'viem/chains'
import { createConfig } from 'wagmi'
import { Chain } from '@wagmi/core'
 
const walletConnectProjectId = '6be37cda619abec4b33405f0a4bfd410'


export const linea = {
  id: 59144,
  name: 'Linea Mainnet',
  network: 'linea mainnet',
  nativeCurrency: {
    decimals: 18,
    name: 'Ethereum',
    symbol: 'ETH',
  },
  rpcUrls: {
    public: { http: ['https://linea.drpc.org'] },
    default: { http: ['https://linea.drpc.org'] },
  },
  blockExplorers: {
    etherscan: { name: 'Lineascan', url: 'https://lineascan.build' },
    default: { name: 'Lineascan', url: 'https://lineascan.build' },
  },
} as const satisfies Chain


export const arthera = {
  id:10242,
  name: 'Arthera',
  network: 'arthera',
  nativeCurrency: {
    decimals: 18,
    name: 'Arthera',
    symbol: 'AA',
  },
  rpcUrls: {
    public: { http: ['https://rpc.arthera.net'] },
    default: { http: ['https://rpc.arthera.net'] },
  },
  blockExplorers: {
    etherscan: { name: 'Artherascan', url: 'https://explorer.arthera.net' },
    default: { name: 'Artherascan', url: 'https://explorer.arthera.net' },
  },

} as const satisfies Chain



export const config = createConfig(
  getDefaultConfig({
    autoConnect: true,
    chains:[polygonMumbai, linea, polygon , arbitrum, optimismGoerli, optimism, arthera, auroraTestnet],
    infuraId: process.env.NEXT_PUBLIC_INFURA_ID,
    appName: 'Publish Credintials - Reclaim',
    walletConnectProjectId,
  })
)
