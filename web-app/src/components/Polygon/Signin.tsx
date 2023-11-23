import { useState, useEffect } from 'react'
import Code from './QrCode'
import { Grid, Text, useToast } from '@chakra-ui/react'

const SigninPolygon = () => {
  const toast = useToast()

  const [QRData, setQRData] = useState('')
  useEffect(() => {
    const NEXT_PUBLIC_AUTH_PID_SERVER_URL =
      process.env.NEXT_PUBLIC_AUTH_PID_SERVER_URL

    let interval: NodeJS.Timer
    const auth = async () => {
      const authRequest = await fetch(
        `${NEXT_PUBLIC_AUTH_PID_SERVER_URL}/api/v1/requests/auth`
      )
      const returnData = JSON.stringify(await authRequest.json())
      setQRData(returnData)
      console.log(returnData)
      const sessionID = authRequest.headers.get('x-id')

      interval = setInterval(async () => {
        try {
          const sessionResponse = await fetch(
            `${NEXT_PUBLIC_AUTH_PID_SERVER_URL}/api/v1/status?id=${sessionID}`
          )
          if (sessionResponse.ok) {
            const data = await sessionResponse.json()
            clearInterval(interval)
            localStorage.setItem('userId', data.id)
            toast({
              title: 'Success! you can continue!',
              description: 'Your ID' + data.id,
              status: 'success',
              duration: 9000,
              isClosable: true
            })
          }
        } catch (e) {
          console.log('err->', e)
        }
      }, 2000)
    }
    auth()
    return () => clearInterval(interval)
  }, [])

  return (
    <Grid justifyContent='flex-start' alignItems='center' height='100%'>
      <Grid alignItems='center'>
        <Code value={QRData} />
      </Grid>
    </Grid>
  )
}

export default SigninPolygon
