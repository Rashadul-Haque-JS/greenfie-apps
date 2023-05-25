import { NextApiRequest, NextApiResponse } from 'next';
import { parseCookies } from 'nookies';
import Users from "@/server/models/users";

export default async function getUserById(req: NextApiRequest, res: NextApiResponse) {
  const cookies = parseCookies({ req });
  const token = cookies.token;
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  const {method} = req.query
  if (method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const users = await Users.find().select('-password');
    return res.status(200).json({ users });
  } catch (err) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
}