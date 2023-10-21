'use client'
import { AppProps } from 'next/app'
import { Providers } from './providers'
import Head from 'next/head'


export const dynamic = 'force-dynamic'
export const dynamicParams = true
export const revalidate = false
export const fetchCache = 'auto'
export const runtime = 'nodejs'
export const preferredRegion = 'auto'
export const maxDuration = 5


export function App ({ Component, pageProps }: AppProps) {
  return (
    <html lang='en'>
      <Head>
        <title>Publish Credintials - Reclaim</title>
        <link rel='icon' href='/favicon.ico' />
        <link
          rel='apple-touch-icon'
          sizes='180x180'
          href='/apple-touch-icon.png'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='32x32'
          href='/favicon-32x32.png'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='16x16'
          href='/favicon-16x16.png'
        />
        <link rel='manifest' href='/manifest.json' />
        <meta name='theme-color' content='#ebedff' />
      </Head>
      <body>
        <Providers>
          {/* <DAppProvider config={config}> */}
          <Component {...pageProps} />
          {/* </DAppProvider> */}
        </Providers>
      </body>
    </html>
  )
}

