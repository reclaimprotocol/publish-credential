import type { NextApiRequest, NextApiResponse } from 'next'
import { reclaimprotocol } from '@reclaimprotocol/reclaim-sdk'
import { MongoClient } from 'mongodb'
const dbUsername = process.env.DB_USER
const dbPassword = process.env.DB_PWD
const callbackBase = process.env.CALLBACK_BASE

// Connect to MongoDB Atlas. Use other DB if needed.
const mongoUri = `mongodb+srv://${dbUsername}:${dbPassword}@cluster0.oe3bojs.mongodb.net/?retryWrites=true&w=majority`
const client = new MongoClient(mongoUri, { monitorCommands: true })

const reclaim = new reclaimprotocol.Reclaim()

export async function GET (request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const callbackId = searchParams.get('callbackId')
    const data = await request.json()
    const { proofs } = JSON.parse(decodeURIComponent(data))
    console.log('[Callback -- TEMP] -- Proofs: ', proofs)

    const isProofCorrect = await reclaim.verifyCorrectnessOfProofs(
      callbackId as string,
      proofs
    )
    console.log('[Callback -- TEMP] -- is Proof Correct? ', isProofCorrect)

    const db = client.db()
    const callbackCollection = db.collection('reclaim-credintial-publisher')

    const entry = await callbackCollection.findOne({ callbackId: callbackId })
    if (!entry) {
      console.log(callbackId, ' not found in the database')
      throw new Error(`${callbackId} not found in the database.`)
      // return false;
    }

    const result = await callbackCollection.updateOne(
      { callbackId: callbackId },
      { $set: { callbackId: callbackId, proofs: proofs } }
    )
    if (result.matchedCount === 0) {
      console.log(callbackId, ' not found in the database')
      throw new Error(`${callbackId} not found in the database.`)
    }

    return new Response(
      JSON.stringify({
        msg: 'Callback received at backend. The backend will verify the proof now.            You can now close this window and go back to the Publisher.'
      })
    )

    console.log(result)
  } catch (error) {
    console.log('[Callback -- TEMP] -- Error: ', error)
  }
}
