import cors from 'cors'
import express from 'express'
import { reclaimprotocol } from '@reclaimprotocol/reclaim-sdk'
import { MongoClient } from 'mongodb'

import dotenv from 'dotenv'

const app = express()
const port = 3003

app.use(cors())
app.use(express.json())

const reclaim = new reclaimprotocol.Reclaim()

dotenv.config()
const dbUsername = process.env.DB_USER
const dbPassword = process.env.DB_PWD
const callbackBase = process.env.CALLBACK_BASE

// Connect to MongoDB Atlas. Use other DB if needed.
const mongoUri = `mongodb+srv://${dbUsername}:${dbPassword}@cluster0.oe3bojs.mongodb.net/?retryWrites=true&w=majority`
const client = new MongoClient(mongoUri, { monitorCommands: true })

const callbackUrl = `${callbackBase}/callback`

app.use((req, res, next) => {
  console.log('[Backend] -- Endpoint called: ', req.url)
  next()
})

// endpoint for the frontend to fetch the reclaim template using sdk.
app.get('/request-proofs', async (req, res) => {
  try {
    const { userAddr: userAddr, providerId } = req.query
    console.log(providerId)
    const db = client.db()
    const callbackCollection = db.collection('reclaim-credintial-publisher')
    const request = reclaim.requestProofs({
      title: 'Credintial Publisher',
      baseCallbackUrl: callbackUrl,
      // contextAddress: userAddr as string,
      requestedProofs: [
        new reclaim.CustomProvider({
          //@ts-ignore
          provider: providerId as string,
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
    await callbackCollection.insertOne({ callbackId: callbackId, proofs: [] })
    res.status(200).json({ reclaimUrl, callbackId, template, id })
  } catch (error) {
    console.error('[B-Request-P -- Catch] -- Error requesting proofs:\n', error)
    res.status(500).json({ error: 'Failed to request proofs' })
  }
  return
})
// ------------------------------------

// endpoint where Reclaim Wallet sends the proof to the backend
app.use(express.text({ type: '*/*' }))
app.post('/callback', async (req, res) => {
  try {
    const { callbackId: callbackId } = req.query
    const { proofs } = JSON.parse(decodeURIComponent(req.body))
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
    res.json({
      msg: 'Callback received at backend. The backend will verify the proof now.            You can now close this window and go back to the Publisher.'
    })

    console.log(result)
  } catch (error) {
    console.log('[Callback -- TEMP] -- Error: ', error)
  }
  return
})
// ------------------------------------

// endpoint where the frontend queries for the proof received from reclaim
app.get('/get-proofs/', async (req, res) => {
  try {
    
    const { id: callbackId } = req.query
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
    res.status(200).json(entry.proofs)
  } catch (error) {
    console.error('[Get-Proofs -- TEMP] -- Error: ', error)
    res.status(500).json({ msg: 'DB not Connected/web3 error' })
  }
  return
})
// ------------------------------------

// Start the Express.js App
app.listen(port, async () => {
  try {
    await client.connect()
    console.log('Connected to mongoDB.')
  } catch (error) {
    console.error('Exiting. Failed to connect to mongoDB with error:', error)
    process.exit(1)
  }
  console.log(`Express server is listening on port ${port}`)
})
