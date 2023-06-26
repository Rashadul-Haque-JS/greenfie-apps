import type { NextApiRequest, NextApiResponse } from 'next';
import login from '@/server/controllers/auth/login';
import connectToDatabase from "@/server/connection";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  connectToDatabase();
  await login(req, res);
}
