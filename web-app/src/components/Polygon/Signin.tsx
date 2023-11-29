import { useState, useEffect } from 'react'
import Code from './QrCode'
import { Grid, Text, useToast } from '@chakra-ui/react'
import { useNetwork } from 'wagmi'

const SigninPolygon = () => {
  const { chain } = useNetwork()
  const toast = useToast()

  const [QRData, setQRData] = useState('')
  useEffect(() => {
    const NEXT_PUBLIC_AUTH_PID_SERVER_URL =
      process.env.NEXT_PUBLIC_AUTH_PID_SERVER_URL

    let interval: NodeJS.Timer
    const auth = async () => {
      const authRequest = await fetch('/api/proxy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          method: 'GET',
          url: `${NEXT_PUBLIC_AUTH_PID_SERVER_URL}/api/v1/requests/auth`,
          data: ''
        })
      })
      const returnData = JSON.stringify(await authRequest.json())
      setQRData(returnData)
      console.log(returnData)
      const sessionID = authRequest.headers.get('x-id')

      interval = setInterval(async () => {
        try {
          const sessionResponse = await fetch('/api/proxy', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              method: 'GET',
              url: `${NEXT_PUBLIC_AUTH_PID_SERVER_URL}/api/v1/status?id=${sessionID}`,
              data: ''
            })
          })
          if (sessionResponse.ok) {
            const data = await sessionResponse.json()
            clearInterval(interval)
            if (data.id.includes('mumbai')) {
              if (chain?.id === 80001) {
                localStorage.setItem('userIdMumbai', data.id)
              } else {
                toast({
                  title: 'Error',
                  description: 'Please switch to Polygon Mumbai on Mobile App',
                  status: 'error',
                  duration: 9000,
                  position: 'top-right',
                  isClosable: true
                })
              }
            } else {
              if (chain?.id === 137) {
                localStorage.setItem('userIdMain', data.id)
              } else {
                toast({
                  title: 'Error',
                  description: 'Please switch to Polygon Mainnet on Mobile App',
                  status: 'error',
                  duration: 9000,
                  position: 'top-right',
                  isClosable: true
                })
              }
            }
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
