import type { NextApiRequest, NextApiResponse } from 'next';
import register from '@/server/controllers/auth/register';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await register (req, res);
}
