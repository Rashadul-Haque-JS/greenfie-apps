import type { NextApiRequest, NextApiResponse } from 'next';
import user from '@/server/controllers/users/getUserById';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await user (req, res);
}
