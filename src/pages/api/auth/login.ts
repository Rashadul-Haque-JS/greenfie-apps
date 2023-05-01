import type { NextApiRequest, NextApiResponse } from 'next';
import login from '@/server/controllers/auth/login';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Call the login function and pass the req and res objects
  await login(req, res);
}
