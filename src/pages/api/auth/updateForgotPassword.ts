import type { NextApiRequest, NextApiResponse } from 'next';
import updateForgotPassword from '@/server/controllers/auth/updateForgotPassword';
import connectToDatabase from "@/server/connection";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectToDatabase();
  await updateForgotPassword (req, res);
}
