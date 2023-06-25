import type { NextApiRequest, NextApiResponse } from 'next';
import forgotPassword from '@/server/controllers/auth/forgotPassword';
import connectToDatabase from "@/server/connection";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectToDatabase();
  await forgotPassword (req, res);
}
