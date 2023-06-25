import type { NextApiRequest, NextApiResponse } from 'next';
import user from '@/server/controllers/users/getUserById';
import connectToDatabase from "@/server/connection";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectToDatabase();
  await user (req, res);
}
