import { useEffect, useState } from 'react'
import { getSchemaAndUid } from '../../utils/get-schema-uid'
import ARBITRUM_EAS from '../../contracts-artifacts/arbitrum-one/EAS.json'
import { AttestationRequest, SchemaEncoder } from '@ethereum-attestation-service/eas-sdk'
import { useAccount, useContractWrite, usePrepareContractWrite } from 'wagmi'
import { Button, Spinner, Text } from '@chakra-ui/react'
import { Proof } from '@reclaimprotocol/reclaim-sdk'

export default function ArbitrumAttestor ({ provider, proof }: {provider: string, proof: Proof | undefined}) {
  const [attestationData, setAttestationData] = useState<AttestationRequest| null>(null)
  const { address } = useAccount()
console.log(proof)
  useEffect(() => {
    if(proof == undefined)return
    const schemaInfo = getSchemaAndUid(provider)

    const schemaEncoder = new SchemaEncoder(schemaInfo.schema)
    const schema: string = schemaInfo.schema

    const schemaItemsRaw = schema.split(', ')
    const schemaItems = []
    console.log(proof)
    console.log(proof.parameters)
    for (let item of schemaItemsRaw) {
      const fItem = item.split(' ')
      schemaItems.push({
        type: fItem[0],
        name: fItem[1],
        value: `${JSON.parse(proof.parameters as string)[fItem[1]]}`
      })
    }
    console.log(schemaItems)
    const encodedStr = schemaEncoder.encodeData(schemaItems)
    setAttestationData({
      schema: schemaInfo.uid,
      data: {
        recipient: address,
        expirationTime: 0,
        revocable: false,
        data: encodedStr,
        refUID: '',
        value: 100
      }
    })
  }, [proof.paramaters, provider, address])

  const {config} = usePrepareContractWrite({
    enabled:!!attestationData,
    //@ts-ignore
    address: ARBITRUM_EAS.address,
    abi: [{
      "inputs": [
        {
          "components": [
            {
              "internalType": "bytes32",
              "name": "schema",
              "type": "bytes32"
            },
            {
              "components": [
                {
                  "internalType": "address",
                  "name": "recipient",
                  "type": "address"
                },
                {
                  "internalType": "uint64",
                  "name": "expirationTime",
                  "type": "uint64"
                },
                {
                  "internalType": "bool",
                  "name": "revocable",
                  "type": "bool"
                },
                {
                  "internalType": "bytes32",
                  "name": "refUID",
                  "type": "bytes32"
                },
                {
                  "internalType": "bytes",
                  "name": "data",
                  "type": "bytes"
                },
                {
                  "internalType": "uint256",
                  "name": "value",
                  "type": "uint256"
                }
              ],
              "internalType": "struct AttestationRequestData",
              "name": "data",
              "type": "tuple"
            }
          ],
          "internalType": "struct AttestationRequest",
          "name": "request",
          "type": "tuple"
        }
      ],
      "name": "attest",
      "outputs": [
        {
          "internalType": "bytes32",
          "name": "",
          "type": "bytes32"
        }
      ],
      "stateMutability": "payable",
      "type": "function"
    }],
    functionName: 'attest',
    args: [{"request":attestationData}],
    onSuccess(data){
        console.log('Successfully Prepared')
    },
    onError(error){
        console.log('Error in Prepare')
        console.log(error)
        console.log(attestationData)

    }
  })

  const { write, data, error, isLoading, isError, isSuccess } = useContractWrite(config)
  console.log(data)

  if(proof == undefined) return null
  return (
    <>
      <Button disabled={isSuccess} colorScheme='blue' onClick={()=>{write?.()}}>Publish with Arbitrum{isLoading && <Spinner/>}</Button>
      {isError && <Text>{error?.message ?? 'Error'}</Text>}
    </>
  )
}
