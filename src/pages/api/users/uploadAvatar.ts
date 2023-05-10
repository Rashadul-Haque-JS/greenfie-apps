import type { NextApiRequest, NextApiResponse } from 'next';
import avatar from '@/server/controllers/users/uploadAvatar';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await avatar (req, res);
}