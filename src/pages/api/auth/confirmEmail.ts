import type { NextApiRequest, NextApiResponse } from 'next';
import confimEmail from '@/server/controllers/auth/confirmEmail';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await confimEmail (req, res);
}
