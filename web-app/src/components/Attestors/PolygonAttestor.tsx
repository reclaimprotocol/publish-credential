import { Proof } from '@reclaimprotocol/reclaim-sdk'
import { useCallback, useEffect, useState } from 'react'
import { Button, Flex, Spinner, Text, useToast, Link } from '@chakra-ui/react'
import { PolygonModal } from './PolygonModal'
import createPolygonIdClaim from '../../utils/create-polygonid-claim'
import { getSchemaAndUidPolygon } from '../../utils/get-pid-schemas'
import Offer from '../Polygon/Offer'
import { reclaimNetworksAddresses } from '../../reclaimNetworkAddresses'

export default function PolygonAttestor ({
  provider,
  proof,
  chain
}: {
  provider: string
  proof: Proof | undefined
  chain: string
}) {
  const [isClicked, setIsClicked] = useState(false)
  const [claim, setClaim] = useState({})
  const [claimId, setClaimId] = useState('')
  const [issuer, setIssuer] = useState('')
  const [subject, setSubject] = useState('')

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

  const publishCred = useCallback(
    async (proof: Proof | undefined) => {
      try {
        setIsLoading(true)
        const { schema } = getSchemaAndUidPolygon(provider)

        if (!schema || !proof) {
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

        console.log(claim)

        const response = await fetch('/api/proxy', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            method: 'POST',
            url: `${
              process.env.NEXT_PUBLIC_ISSUER_PID_SERVER_URL
            }/api/v1/identities/${
              //@ts-ignore
              reclaimNetworksAddresses[chain]
            }/claims`,
            data: JSON.stringify(claimR)
          })
        })
        if (response.ok) {
          const data = await response.json()

          const credentialResponse = await fetch('/api/proxy', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              method: 'GET',
              url: `${
                process.env.NEXT_PUBLIC_ISSUER_PID_SERVER_URL
              }/api/v1/identities/${
                //@ts-ignore
                reclaimNetworksAddresses[chain]
              }/claims/${data.id}`,
              data: ''
            })
          })

          const credential = await credentialResponse.json()

          setClaimId(data.id)
          setIssuer(credential.issuer)
          setSubject(credential.credentialSubject.id)

          toast({
            title: 'Success',
            description: 'Credential published',
            status: 'success',
            duration: 9000,
            isClosable: true,
            position: 'top-right'
          })
          setSettled(true)
          console.log('credential', credential)
        } else {
          toast({
            title: 'Error',
            description: (await response.json()).error,
            status: 'error',
            duration: 9000,
            isClosable: true,
            position: 'top-right'
          })
        }
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
    },
    [proof]
  )

  return (
    <>
      {!settled && (
        <Button
          disabled={isClicked}
          colorScheme='blue'
          onClick={async () => {
            setIsClicked(true)
            await publishCred(proof)
            setIsClicked(false)
          }}
        >
          Publish with Polygon Identity {isLoading && <Spinner />}
        </Button>
      )}

      {settled && (
        <Flex gap={'10px'} flexDirection={'column'}>
          <Offer subject={subject} claimId={claimId} issuer={issuer} />
        </Flex>
      )}
    </>
  )
}
