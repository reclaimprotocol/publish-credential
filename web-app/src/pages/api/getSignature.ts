import type { NextApiRequest, NextApiResponse } from 'next'
import { ReclaimClient } from '@reclaimprotocol/js-sdk'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try{
    const { requestedProofs } = req.body
    const APP_ID = '0x9B5fc54c81Af20687d9C83ff36FD8450dB812ba6'
    const reclaimClient = new ReclaimClient(APP_ID)

    const signature = await reclaimClient.getSignature(requestedProofs, process.env.RECLAIM_APP_SECRET)
        
    res.status(200).json({ signature })
    } catch(e: any){
        res.status(400).json({ error: e.message })
    }
}