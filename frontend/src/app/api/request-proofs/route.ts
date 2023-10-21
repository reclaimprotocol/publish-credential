import { reclaimprotocol } from '@reclaimprotocol/reclaim-sdk'
import { MongoClient } from 'mongodb'
import { ethers } from 'ethers'

const dbUsername = process.env.DB_USER
const dbPassword = process.env.DB_PWD
const callbackBase = process.env.CALLBACK_BASE

// Connect to MongoDB Atlas. Use other DB if needed.
const mongoUri = `mongodb+srv://${dbUsername}:${dbPassword}@cluster0.oe3bojs.mongodb.net/?retryWrites=true&w=majority`
const client = new MongoClient(mongoUri, { monitorCommands: true })
const callbackUrl = `${callbackBase}/callback`

const reclaim = new reclaimprotocol.Reclaim()

export async function GET (req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const provider = searchParams.get('providerId')
    const randNum = Math.random() * 100000
    const request = reclaim.requestProofs({
      title: 'Publish Credentials',
      baseCallbackUrl: callbackUrl,
      callbackId: ethers.utils.parseUnits(randNum.toString(), 18).toString(),
      requestedProofs: [
        new reclaim.CustomProvider({
            //@ts-ignore
          provider: provider!,
          payload: {}
        })
      ]
    })
    const reclaimUrl = await request.getReclaimUrl({ shortened: true })

    const { callbackId, template, id } = request

    console.log('[B-Request-P -- TEMP] -- CallbackId: ', callbackId)
    console.log('[B-Request-P -- TEMP] -- Template: ', template)
    console.log('[B-Request-P -- TEMP] -- Id: ', id)
    console.log('[B-Request-P -- TEMP] -- ReclaimUrl: ', reclaimUrl)
    const db = client.db()
    const callbackCollection = db.collection('reclaim')
    await callbackCollection.insertOne({ callbackId: callbackId, proofs: [] })
    return new Response(JSON.stringify({ reclaimUrl, callbackId }))
  } catch (error: any) {
    console.error(error)
  }
}
