import type { NextApiRequest, NextApiResponse } from 'next';
import favApps from '@/server/controllers/favapps/fav-apps';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await favApps (req, res);
}