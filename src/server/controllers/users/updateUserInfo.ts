import { NextApiRequest, NextApiResponse } from 'next';
import Users from "@/server/models/users";
import jwt  from 'jsonwebtoken';
import type { UpdateQuery } from 'mongoose';
import {DecodedToken} from '@/utils/types'

export default async function updateUser(req: NextApiRequest, res: NextApiResponse) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  const method = req.method;
  if (method !== 'PUT') {
    res.setHeader('Allow', ['PUT']);
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const {body } = req;
  
  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET!)as DecodedToken;
   const id = decodedToken._id
    const result = await Users.findByIdAndUpdate(id, body as UpdateQuery<any>, { new: true })
    if (result) {
      res.status(200).json({message:'Updated successfully'});
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating user' });
  }
}
