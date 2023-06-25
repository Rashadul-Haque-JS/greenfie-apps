import type { NextApiRequest, NextApiResponse } from 'next';
import updatePassword from '@/server/controllers/auth/updatePassword';
import connectToDatabase from "@/server/connection";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectToDatabase();
  await updatePassword (req, res);
}