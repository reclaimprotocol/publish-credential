// import { AttestationRequest, SchemaEncoder } from '@ethereum-attestation-service/eas-sdk'
// import { Proof } from '@reclaimprotocol/reclaim-sdk'
// import { ethers } from 'ethers'


// export async function getToPublishEASData (
//   proof: Proof,
//   schema: string,
//   uid: string,
//   recipient: string
// ): Promise<AttestationRequest> {
//   const schemaItemsRaw = schema.split(', ')
//   const schemaItems = []
//   for (let item of schemaItemsRaw) {
//     const fItem = item.split(' ')
//     schemaItems.push({
//       type: fItem[0],
//       name: fItem[1],
//       value: JSON.parse(proof.parameters as string)[fItem[1]]
//     })
//   }

//   const schemaEncoder = new SchemaEncoder(schema)
//   const encodedStr = schemaEncoder.encodeData(schemaItems)

//   return {
//     schema: uid,
//     data: {
//       recipient: recipient,
//       revocable: false,
//       data: encodedStr,
//       expirationTime: BigInt(0),
//       refUID: ethers.constants.HashZero,
//       value: ethers.utils.parseEther("0.0005").toBigInt()
//     }
//   }
// }
