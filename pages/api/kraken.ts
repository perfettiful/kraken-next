import type { NextApiRequest, NextApiResponse } from 'next';
import KrakenClient from './KrakenClient';

const client = new KrakenClient(process.env.KRAKEN_API_KEY!, process.env.KRAKEN_API_SECRET!);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        switch (req.method) {
            case 'GET':
                const accountInfo = await client.getAccountInfo();
                res.status(200).json(accountInfo);
                break;
            case 'POST':
                const newOrder = await client.createOrder(req.body);
                res.status(200).json(newOrder);
                break;
            case 'PUT':
                const updatedOrder = await client.updateOrder(req.body);
                res.status(200).json(updatedOrder);
                break;
            default:
                res.setHeader('Allow', ['GET', 'POST', 'PUT']);
                res.status(405).end(`Method ${req.method} Not Allowed`);
        }
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
}

