import type { NextApiRequest, NextApiResponse } from 'next';
import confirmReset from '@/server/controllers/auth/confirmReset';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await confirmReset (req, res);
}
