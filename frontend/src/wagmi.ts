import { getDefaultConfig } from 'connectkit'
import { arbitrum, arbitrumGoerli, lineaTestnet, optimism, polygon, polygonMumbai, optimismGoerli} from 'viem/chains'
import { createConfig } from 'wagmi'
import { Chain } from '@wagmi/core'
import { Mumbai } from '@usedapp/core'
 
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
  // contracts: {
  //   multicall3: {
  //     address: '0xca11bde05977b3631167028862be2a173976ca11',
  //     blockCreated: 11_907_934,
  //   },
  // },
} as const satisfies Chain
export const config = createConfig(
  getDefaultConfig({
    autoConnect: true,
    chains:[linea, polygon, polygonMumbai, arbitrum, optimismGoerli],
    infuraId: process.env.NEXT_PUBLIC_INFURA_ID,
    appName: 'Publish Credintials - Reclaim',
    walletConnectProjectId,
  })
)
