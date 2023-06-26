import type { NextApiRequest, NextApiResponse } from 'next';
import recipes from '@/server/controllers/recipes/recipes';
import connectToDatabase from "@/server/connection";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  connectToDatabase();
  await recipes (req, res);
}