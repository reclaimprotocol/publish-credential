import { Proof } from '@reclaimprotocol/reclaim-sdk'
import { useCallback, useEffect, useState } from 'react'
import { Button, Flex, Spinner, Text, useToast, Link } from '@chakra-ui/react'
import { PolygonModal } from './PolygonModal'
import createPolygonIdClaim from '../../utils/create-polygonid-claim'
import { getSchemaAndUidPolygon } from '../../utils/get-pid-schemas'

export default function PolygonAttestor ({
  provider,
  proof
}: {
  provider: string
  proof: Proof | undefined
}) {
  const [isClicked, setIsClicked] = useState(false)
  const [claim, setClaim] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [settled, setSettled] = useState(false)
  const toast = useToast()

  useEffect(() => {
    if (proof == undefined) return
    const { schema } = getSchemaAndUidPolygon(provider)

    if (!schema) {
      toast({
        title: 'Provider not Supported',
        description: 'Please contact the issuer',
        status: 'error',
        duration: 9000,
        isClosable: true
      })
      return
    }

    const params =
      proof.extractedParameterValues == undefined
        ? JSON.parse(proof.parameters as string)
        : proof.extractedParameterValues

    const claimR = createPolygonIdClaim(params, provider, schema as string)
    console.log(claimR)
    setClaim(claimR)
  }, [proof])

  const publishCred = useCallback(async () => {
    try {
      setIsLoading(true)
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_ISSUER_PID_SERVER_URL}/api/v1/identities/${process.env.NEXT_PUBLIC_DID}/claims`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(claim)
        }
      )

      const data = await response.json()

      const credentialResponse = await fetch(
        `${process.env.NEXT_PUBLIC_ISSUER_PID_SERVER_URL}/api/v1/identities/${process.env.NEXT_PUBLIC_DID}/claims/${data.id}`
      )
      const credential = await credentialResponse.json()

      console.log('credential', credential)
    } catch (e) {
      console.log(e)
      toast({
        title: 'Error',
        description: 'Something went wrong',
        status: 'error',
        duration: 9000,
        isClosable: true
      })
    } finally {
      setIsLoading(false)
    }
  }, [proof])

  return (
    <>
      <Button
        disabled={isClicked}
        colorScheme='blue'
        onClick={async () => {
          await publishCred()
          setIsClicked(true)
        }}
      >
        Publish with Polygon Identity {isLoading && <Spinner />}
      </Button>

      {settled && (
        <Flex gap={'10px'} flexDirection={'column'}>
          <Link color={'blue.400'} isExternal>
            Go to transaction
          </Link>
        </Flex>
      )}
    </>
  )
}
