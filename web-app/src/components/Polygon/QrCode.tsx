import { FunctionComponent } from 'react'
import QRCode from 'react-qr-code'
import { Container, Box, Button } from '@chakra-ui/react'

interface CodeProps {
  value: string
}

const Code: FunctionComponent<CodeProps> = props => {
  const { value } = props
  return (
    <>
      <Box sx={{ width: [210] }} >
        <QRCode level={'L'} size={210} value={value} />
      </Box>
      <Button
        onClick={() => dispachEvent(value)}
        // variant='contained'
        colorScheme='blue'
        // size='large'
        sx={{
          width: '210px',
          marginTop: '15px'
        }}
      >
        Polygon ID
      </Button>
    </>
  )
}

const dispachEvent = async (value: string) => {
  console.log('data to ext:', value)
  const msg = btoa(value)
  const hrefValue = `den3comm://?request_uri=${msg}`
  console.log('link to ext:', hrefValue)

  const _authEvent = new CustomEvent('authEvent', { detail: hrefValue })
  document.dispatchEvent(_authEvent)
}

export default Code
