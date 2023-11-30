import { use, useState, useEffect } from 'react'
import QRCode from './QrCode'
import { Grid, Text } from '@chakra-ui/react'
import { useNetwork } from 'wagmi'

type OfferProps = {
  issuer: string
  subject: string
  claimId: string
}

const Offer = ({ issuer, subject, claimId }: OfferProps) => {
  const [credentialOffer, setCredentialOffer] = useState('')
  const { chain } = useNetwork()

  useEffect(() => {
    const getOffer = async () => {
      try {
        const offerResponse = await fetch('/api/proxy', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            method: 'GET',
            url: `${
              chain?.id === 80001
                ? process.env.NEXT_PUBLIC_ISSUER_PID_SERVER_URL
                : 'http://3.89.212.207:3333'
            }/api/v1/identities/${issuer}/claims/offer?subject=${subject}&claimId=${claimId}`,
            data: ''
          })
        })
        const data = await offerResponse.json()
        data['body']['credentials'][0]['description'] = 'Reclaim Credential'
        setCredentialOffer(JSON.stringify(data))
      } catch (e) {
        console.log('failed get offer message ->', e)
      }
    }
    getOffer()
  }, [])

  return (
    <Grid justifyContent='flex-start' alignItems='center' height='100%'>
      <Grid alignItems='center'>
        <Text variant='h1'>Scan QR for fetch credential</Text>
      </Grid>
      <Grid alignItems='center'>
        <QRCode value={credentialOffer} />
      </Grid>
    </Grid>
  )
}

export default Offer
