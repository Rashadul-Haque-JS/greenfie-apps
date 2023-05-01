import type { NextApiRequest, NextApiResponse } from 'next';
import products from '@/server/controllers/products/products';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await products (req, res);
}
