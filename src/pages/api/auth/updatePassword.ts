import type { NextApiRequest, NextApiResponse } from 'next';
import updatePassword from '@/server/controllers/auth/updatePassword';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await updatePassword (req, res);
}