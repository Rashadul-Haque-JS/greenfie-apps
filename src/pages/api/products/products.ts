import type { NextApiRequest, NextApiResponse } from 'next';
import products from '@/server/controllers/products/products';
import connectToDatabase from "@/server/connection";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  connectToDatabase();
  await products (req, res);
}
