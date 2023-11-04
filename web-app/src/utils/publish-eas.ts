import {
  AttestationRequest,
  SchemaEncoder
} from '@ethereum-attestation-service/eas-sdk'
import { Proof } from '@reclaimprotocol/reclaim-sdk'
import { ethers } from 'ethers'

export async function getToPublishEASData (
  proof: Proof,
  schema: string,
  uid: string,
  recipient: string
): Promise<AttestationRequest> {
  const schemaItemsRaw = schema.split(',')
  const schemaItems = []
  for (let item of schemaItemsRaw) {
    const fItem = item.split(' ')
    schemaItems.push({
      type: fItem[0],
      name: fItem[1],
      value: JSON.parse(proof.parameters as string)[fItem[1]]
    })
  }
  console.log('Schema Items', schemaItems)
  const schemaEncoder = new SchemaEncoder(schema)
  //@ts-ignore
  const encodedStr = schemaEncoder.encodeData(schemaItems)
  console.log('Encoded String', encodedStr)

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
