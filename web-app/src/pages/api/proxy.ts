import axios from 'axios'
import type { NextApiRequest, NextApiResponse } from 'next'


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { method, url, data } = req.body
    let response
    if (method === 'GET') {
        response = await fetch(url, {
            method: method,
            headers: {
                contentType: 'application/json',
            },
        })
    } else {
        response = await fetch(url, {
            method: method,
            headers: {
                contentType: 'application/json',
            },
            body: data,
        })
    }


    if (response.ok) {
        const returned = await response.json()
        console.log(returned)
        res.setHeader('x-id', response.headers.get('x-id') || '')
        res.json(returned)
    } else {
        const error = await response.text()

        console.log(error)
        res.status(400).json({ error: error })
    }
}