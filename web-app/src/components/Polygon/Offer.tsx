import { use, useState, useEffect } from 'react'
import QRCode from './QrCode'
import { Grid, Text } from '@chakra-ui/react'

type OfferProps = {
  issuer: string
  subject: string
  claimId: string
}

const Offer = ({ issuer, subject, claimId }: OfferProps) => {
  const [credentialOffer, setCredentialOffer] = useState('')

  useEffect(() => {
    const getOffer = async () => {
      try {
        const offerResponse = await fetch(
          `${process.env.NEXT_PUBLIC_ISSUER_PID_SERVER_URL}/api/v1/identities/${issuer}/claims/offer?subject=${subject}&claimId=${claimId}`
        )
        setCredentialOffer(JSON.stringify(await offerResponse.json()))
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
