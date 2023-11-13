import type { NextApiRequest, NextApiResponse } from 'next'
import { MongoClient } from 'mongodb'

const dbUsername = process.env.DB_USER
const dbPassword = process.env.DB_PWD
const callbackBase = process.env.CALLBACK_BASE

// Connect to MongoDB Atlas. Use other DB if needed.
const mongoUri = `mongodb+srv://${dbUsername}:${dbPassword}@cluster0.oe3bojs.mongodb.net/?retryWrites=true&w=majority`
const client = new MongoClient(mongoUri, { monitorCommands: true })

export default async function handler (
  req: NextApiRequest,
  res: NextApiResponse
) {
  // res.json([
  //   {
  //     templateClaimId: 'df3466ef-e0d2-481b-9ac4-689a43190aad',
  //     provider: 'google-login',
  //     parameters: '{"emailAddress":"haidarjbeily76@gmail.com"}',
  //     ownerPublicKey:
  //       '02ac423869719e0b5c3c300877e6444a4aeed467308ee0d0c7f7b9beac708a9be4',
  //     timestampS: '1699041767',
  //     signatures: [
  //       '0xa3b71003f8cb459c2ad516fa5517b43d766ae44fa18df486d53035d4910eafef15f7f99a50ab65c3f503265730eae4d194613b43b94c792e63b4be71da35cdc41c'
  //     ],
  //     redactedParameters: '{"emailAddress":"**************@gmail.com"}',
  //     context:
  //       '{"contextAddress":"0x0","contextMessage":"0x9c1aa92781dcf4661f8abff2ea9404df23c86a42f6649fca4c2390d95bf77b2d","sessionId":"18387462655382937000000"}',
  //     epoch: 2,
  //     identifier:
  //       '0xb1cdff0306e63559c8a1376a8f0cf7d9b458e48d81d50c1b6c9a7b7e2ea8f481'
  //   }
  // ])
  // return
  try {
    try {
      const { id: callbackId } = req.query
      const db = client.db()
      const callbackCollection = db.collection('reclaim')
      const entry = await callbackCollection.findOne({
        callbackId: callbackId
      })
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
      } else {
        console.log(entry.proofs)
        res.status(200).json(entry.proofs)
      }
    } catch (error) {
      console.error('[Get-Proofs -- TEMP] -- Error: ', error)
      res.status(500).json({ msg: 'DB not Connected/web3 error' })
    }
    return
  } catch (error: any) {
    console.error(error)

    res.status(500).end()
  }
}
