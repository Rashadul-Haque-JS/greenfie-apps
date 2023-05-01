import type { NextApiRequest, NextApiResponse } from 'next';
import forgotPassword from '@/server/controllers/auth/forgotPassword';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await forgotPassword (req, res);
}
