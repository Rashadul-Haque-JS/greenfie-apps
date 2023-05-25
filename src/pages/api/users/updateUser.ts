import type { NextApiRequest, NextApiResponse } from 'next';
import updateUser from '@/server/controllers/users/updateUserInfo';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await updateUser (req, res);
}
