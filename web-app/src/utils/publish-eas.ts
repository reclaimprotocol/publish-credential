import {
  AttestationRequest,
  SchemaEncoder
} from '@ethereum-attestation-service/eas-sdk'
import { Proof } from './types'
import { ethers } from 'ethers'

export async function getToPublishEASData (
  proof: Proof,
  schema: string,
  uid: string,
  recipient: string
): Promise<AttestationRequest> {
  const schemaItemsRaw = schema.split(',')
  const schemaItems = []
  const params =
    proof.extractedParameterValues == undefined
      ? JSON.parse(proof.claimData.parameters as string)
      : proof.extractedParameterValues
  console.log(proof.extractedParameterValues)
  if (proof.claimData.provider == 'http') {
    schemaItems.push({
      type: 'string',
      name: 'parameters',
      value: JSON.stringify(params)
    })
  } else {
    for (let item of schemaItemsRaw) {
      const fItem = item.split(' ')
      schemaItems.push({
        type: fItem[0],
        name: fItem[1],
        value: params[fItem[1]]
      })
    }
  }

  const schemaEncoder = new SchemaEncoder(schema)
  //@ts-ignore
  const encodedStr = schemaEncoder.encodeData(schemaItems)

  // const data = ethers.encodeBase64(proof.parameters as string)
  return {
    schema: uid,
    data: {
      recipient: ethers.ZeroAddress,
      revocable: false,
      data: encodedStr,
      expirationTime: BigInt(0),
      refUID: ethers.ZeroHash,
      value: ethers.parseEther('0')
    }
  }
}
