import { NextApiRequest, NextApiResponse } from 'next';
import { parseCookies } from 'nookies';
import Users from "@/server/models/users";
import type { UpdateQuery } from 'mongoose';

export default async function getUserById(req: NextApiRequest, res: NextApiResponse) {
  const cookies = parseCookies({ req });
  const token = cookies.token;
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  const {query } = req;
  const {id,body,method} = query

  if (method !== 'PUT') {
    res.setHeader('Allow', ['PUT']);
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    if (body?.hasOwnProperty('password') || body?.hasOwnProperty('confirmPassword')) {
        return { message: 'Please use the update password section to update your password.' };
      }
    const result = await Users.findByIdAndUpdate(id, body as UpdateQuery<any>, { new: true })
    if (result) {
      res.status(200).json('User updated successfully');
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating user' });
  }
}
