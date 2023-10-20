import cors from 'cors'
import express from 'express'
import { reclaimprotocol } from '@reclaimprotocol/reclaim-sdk'
import dotenv from 'dotenv'
import { MongoClient } from 'mongodb'

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
    // res.json([
//   {
//     templateClaimId: 'da3ee9ee-a70f-4a98-9528-f086fa1bc5e6',
//     provider: 'google-login',
//     parameters: '{"emailAddress":"haidarjbeily76@gmail.com"}',
//     ownerPublicKey: '028e2ad4e0a9afb164dc17b6e148ed2821f8c34a10383addeac025480b30bbd82f',
//     timestampS: '1697838089',
//     witnessAddresses: [ 'https://reclaim-node.questbook.app' ],
//     signatures: [
//       '0xe2e3b1eac0c2eda4823164917a663149f8222bb19e2b0b462e5cd5500ee6a5821b16a3364868ac15ea03e6a303f8c933331e6df89993963510072727b198d1eb1c'
//     ],
//     redactedParameters: '{"emailAddress":"**************@gmail.com"}',
//     context: '{"contextAddress":"0x0","contextMessage":"0x318aa2410f8faf2495362508dd9a765366845f619dd85f54f4b6d5822dd2f5f3","sessionId":"781b8ea5-1e8c-4ccb-a44f-3aa4ec93fc4e"}',
//     epoch: 2,
//     identifier: '0x450550f75e697d99e28ed1be9a04d948003a458a9a7adbb6dfa8a410c504c160'
//   }
// ])
    // return
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
