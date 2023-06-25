import type { NextApiRequest, NextApiResponse } from 'next';
import confimEmail from '@/server/controllers/auth/confirmEmail';
import connectToDatabase from "@/server/connection";
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectToDatabase();
  await confimEmail (req, res);
}
