import type { NextApiRequest, NextApiResponse } from 'next'
import { reclaimprotocol } from '@reclaimprotocol/reclaim-sdk'
import { MongoClient } from 'mongodb'
import { ethers } from 'ethers'

const dbUsername = process.env.DB_USER
const dbPassword = process.env.DB_PWD

// Connect to MongoDB Atlas. Use other DB if needed.
const mongoUri = `mongodb+srv://${dbUsername}:${dbPassword}@cluster0.oe3bojs.mongodb.net/?retryWrites=true&w=majority`
const client = new MongoClient(mongoUri, { monitorCommands: true })

const reclaim = new reclaimprotocol.Reclaim()
const callbackBase = process.env.CALLBACK_BASE

export default async function handler (
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { provider } = req.query
    const randNum = Math.random() * 100000
    const providerData = JSON.parse(provider as string)
    console.log(providerData || 'No body data')
    console.log({
                    name: providerData.value.name,
                    logoUrl: providerData.value.logoUrl,
                    url: providerData.value.url,
                    loginUrl: providerData.value.loginUrl,
                    loginCookies: providerData.value.loginCookies,
                    responseSelection: providerData.value.responseSelections,
                    useZk: true
                })
    let requestedProof
    if (providerData.type === 'http') {
      //@ts-ignore
      requestedProof = new reclaim.HttpsProvider({
                    name: providerData.value.name,
                    logoUrl: providerData.value.logoUrl,
                    url: providerData.value.url,
                    loginUrl: providerData.value.loginUrl,
                    loginCookies: providerData.value.loginCookies,
                    responseSelection: providerData.value.responseSelections,
                    useZk: true
                })
    } else {
      requestedProof = new reclaim.CustomProvider({
                provider: providerData.value.providerId,
                payload: {}
      })
    }
    const request = reclaim.requestProofs({
      title: 'Credintials Publisher',
      baseCallbackUrl: callbackBase + '/api/callback',
      callbackId: ethers.parseUnits(randNum.toString(), 18).toString(),
      requestedProofs: [requestedProof]
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
    res.send({ reclaimUrl, callbackId })
  } catch (error: any) {
    console.error(error)

    res.status(500).end()
  }
}
