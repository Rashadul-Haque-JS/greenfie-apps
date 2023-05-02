import { NextApiRequest, NextApiResponse } from 'next';
import { parseCookies } from 'nookies';
import Users from "@/server/models/users";

export default async function getUserById(req: NextApiRequest, res: NextApiResponse) {
  const cookies = parseCookies({ req });
  const token = cookies.token;
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  const {query } = req;
  if (query.method !== 'DELETE') {
    res.setHeader('Allow', ['DELETE']);
    return res.status(405).json({ message: 'Method not allowed' });
  }
  try {
    const { id } = query;
    const result = await  Users.findByIdAndDelete(id as string);
    if (result) {
      res.status(200).json('User deleted successfully');
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user' });
  }
}