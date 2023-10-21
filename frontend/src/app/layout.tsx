import { Providers } from './providers'
// import {
//   Config,
//   DAppProvider,
//   LineaTestnet,
//   Mumbai,
//   Polygon,
//   OptimismGoerli,
//   Optimism,
//   Arbitrum,
//   ArbitrumGoerli,
//   MetamaskConnector
// } from '@usedapp/core'

export const metadata = {
  title: 'Publish Credintials - Reclaim'
}
export const dynamic = 'force-dynamic'
export const dynamicParams = true
export const revalidate = false
export const fetchCache = 'auto'
export const runtime = 'nodejs'
export const preferredRegion = 'auto'
export const maxDuration = 5

// const config: Config = {
//   readOnlyChainId: Polygon.chainId,
//   readOnlyUrls: {
//     [Polygon.chainId]: `https://polygon-mainnet.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_ID}`,
//     [Mumbai.chainId]: `https://polygon-mumbai.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_ID}`,
//     [LineaTestnet.chainId]: `https://linea-goerli.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_ID}`,
//     [Arbitrum.chainId]: `https://arbitrum-mainnet.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_ID}`,
//     [ArbitrumGoerli.chainId]: `https://arbitrum-goerli.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_ID}`,
//     [Optimism.chainId]: `https://optimism-mainnet.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_ID}`,
//     [OptimismGoerli.chainId]: `https://optimism-goerli.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_ID}`
//   },
//   connectors: {
//     metamask: new MetamaskConnector()
//   }
// }


export default function RootLayout ({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <body>
        <Providers>
          {/* <DAppProvider config={config}> */}
          {children}
          {/* </DAppProvider> */}
        </Providers>
      </body>
    </html>
  )
}
