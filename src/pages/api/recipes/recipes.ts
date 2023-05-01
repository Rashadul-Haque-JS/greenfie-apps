import type { NextApiRequest, NextApiResponse } from 'next';
import recipes from '@/server/controllers/recipes/recipes';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await recipes (req, res);
}