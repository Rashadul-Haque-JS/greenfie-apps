import type { NextApiRequest, NextApiResponse } from 'next';
import updateForgotPassword from '@/server/controllers/auth/updateForgotPassword';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await updateForgotPassword (req, res);
}
