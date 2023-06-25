import type { NextApiRequest, NextApiResponse } from 'next';
import register from '@/server/controllers/auth/register';
import connectToDatabase from "@/server/connection";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectToDatabase();
  await register (req, res);
}
