import { Proof } from '@reclaimprotocol/reclaim-sdk'


export default async function publishWithDisco (proof: Proof) {
  try {
    let myHeaders = new Headers()
    myHeaders.append('Content-Type', 'application/json')
    myHeaders.append('Accept', '*/*')
    myHeaders.append(
      'Authorization',
      `Bearer ${process.env.NEXT_PUBLIC_DISCO_API_KEY}`
    )

    let raw = JSON.stringify({
      issuer:
        'did:3:kjzl6cwe1jw146tylqdgrlf0nv0pgwy8edv8lcsbjvikfcr7pkge35mcnet8hx3',
      schemaUrl:
        'https://raw.githubusercontent.com/discoxyz/disco-schemas/main/json/BetaUserCredential/1-0-0.json',
      recipientDID:
        'did:3:kjzl6cwe1jw146tylqdgrlf0nv0pgwy8edv8lcsbjvikfcr7pkge35mcnet8hx3',
      subjectData: {
        id:'did:3:kjzl6cwe1jw146tylqdgrlf0nv0pgwy8edv8lcsbjvikfcr7pkge35mcnet8hx3',
        ...proof.parameters
      },
      expirationDate: '',
      isPublic: true
    })
    let requestOptions: RequestInit = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    }

    const response = await fetch(
      'https://api.disco.xyz/v1/credential',
      requestOptions
    )
    const result = await response.json()
    console.log(result)

    return { result, success: true }
  } catch (error: any) {
    console.error(error)
    return { result: null, success: false }
  }
}
