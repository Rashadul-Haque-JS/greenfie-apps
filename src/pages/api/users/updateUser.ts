import type { NextApiRequest, NextApiResponse } from 'next';
import updateUser from '@/server/controllers/users/updateUserInfo';
import connectToDatabase from "@/server/connection";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectToDatabase();
  await updateUser (req, res);
}
