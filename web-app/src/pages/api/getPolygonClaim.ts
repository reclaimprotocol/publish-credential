import axios from 'axios'
import type { NextApiRequest, NextApiResponse } from 'next'


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { claimId } = req.query

    const url = `${process.env.NEXT_PUBLIC_ISSUER_PID_SERVER_URL}/api/v1/identities/${process.env.NEXT_PUBLIC_DID}/claims/${claimId}`
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            contentType: 'application/json',
        },
    })

    if (response.ok) {
        const returned = await response.json()
        res.json(returned)
    } else {
        const error = await response.text()

        console.log(error)
        res.status(400).json({ error: error })
    }
}