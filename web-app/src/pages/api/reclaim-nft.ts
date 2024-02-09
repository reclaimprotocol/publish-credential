import { NextApiRequest, NextApiResponse } from 'next';
import { MongoClient } from 'mongodb'
import { generateUuid } from '@reclaimprotocol/reclaim-sdk/dist/utils';

const { DB_USER, DB_PWD } = process.env;
console.log(DB_USER, DB_PWD);
const uri = `mongodb+srv://${DB_USER}:${DB_PWD}@cluster0.oe3bojs.mongodb.net/NFT-STORE?ssl=true&authSource=admin&retryWrites=true`;
const db = (new MongoClient(uri)).db('NFT-STORE');

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { method, query, body } = req;
    
    switch (method) {
        case 'GET':
            // Handle GET request to return token metadata
            try {
                const { tokenId } = query;
                const data = await await db.collection('nftMetadata').findOne({ tokenId });
                if(data){
                    res.json(data.metadata);
                }else{
                    res.status(404).json({ message: 'NFT not found' });
                }                
            } catch (error) {
                console.error(error);
                res.status(500).json({ error: 'Internal Server Error' });
            }
            break;

        case 'POST':
            // Handle POST request to save metadata in MongoDB
            try {
                const { providerName, parameters } = body; // Assuming the metadata is sent in the request body
                const metadata = {
                    name: `Reclaim Credential - ${providerName}`,
                    description: "Proof of ownership: " + (parameters as []).join(", "),
                    image: 'https://publish-credentials.reclaimprotocol.org/logo.png',   
                }
                const tokenId = generateUuid();
                // Save metadata in MongoDB
                const saved = await db.collection('nftMetadata').insertOne({
                   tokenId: tokenId,
                   metadata
                });

                res.status(201).json({ message: 'Metadata saved successfully', tokenURI: `https://publish-credentials.reclaimprotocol.org/api/reclaim-nft?tokenId=${tokenId}`  });
            } catch (error) {
                console.error(error);
                res.status(500).json({ error: 'Internal Server Error' });
            }
            break;

        default:
            res.setHeader('Allow', ['GET', 'POST']);
            res.status(405).end(`Method ${method} Not Allowed`);
            break;
    }
}
