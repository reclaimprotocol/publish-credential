import { reclaimprotocol } from '@reclaimprotocol/reclaim-sdk'
import { MongoClient } from 'mongodb'

const dbUsername = process.env.DB_USER
const dbPassword = process.env.DB_PWD
const callbackBase = process.env.CALLBACK_BASE

// Connect to MongoDB Atlas. Use other DB if needed.
const mongoUri = `mongodb+srv://${dbUsername}:${dbPassword}@cluster0.oe3bojs.mongodb.net/?retryWrites=true&w=majority`
const client = new MongoClient(mongoUri, { monitorCommands: true })

export async function GET (req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const callbackId  = searchParams.get('id')
    const db = client.db()
    const callbackCollection = db.collection('reclaim-credintial-publisher')
    const entry = await callbackCollection.findOne({ callbackId: callbackId })
    if (!entry) {
      console.log(callbackId, ' not found in the database')
      throw new Error(`${callbackId} not found in the database.`)
    }
    console.log(entry.proofs)
    if (entry.proofs == undefined || entry.proofs?.length == 0) {
      console.log(callbackId, ' proof not received')
      throw new Error(
        `Proof from ${callbackId} not received from Reclaim Wallet.`
      )
    }
    console.log(entry.proofs)
    return new Response(JSON.stringify( entry.proofs))
  } catch (error) {
    console.error('[Get-Proofs -- TEMP] -- Error: ', error)
  }
}
