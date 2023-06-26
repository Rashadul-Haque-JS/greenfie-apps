import type { NextApiRequest, NextApiResponse } from 'next';
import confirmReset from '@/server/controllers/auth/confirmReset';
import connectToDatabase from "@/server/connection";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  connectToDatabase();
  await confirmReset (req, res);
}
