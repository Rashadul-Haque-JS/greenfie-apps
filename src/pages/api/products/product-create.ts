import type { NextApiRequest, NextApiResponse } from 'next';
import productCreate from '@/server/controllers/products/productCreate';

export const config = {    // This code block is very important in nextjs multiform
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await productCreate (req, res);
}