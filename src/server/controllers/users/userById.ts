import { NextApiRequest, NextApiResponse } from 'next';
import Users from "@/server/models/users";
import jwt from 'jsonwebtoken';

interface DecodedToken {
    _id: string;
    iat: number;
    exp: number;
  }

export default async function getUserById(req: NextApiRequest, res: NextApiResponse) {
  const token = req.headers.authorization?.split(' ')[1];
  console.log(token);
  
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  
  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET!)as DecodedToken;;
    const user = await Users.findOne({ _id: decodedToken._id }).select('-password -confirmToken -confirmed -resetPasswordToken');
    return res.status(200).json({ user });
  } catch (err) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
}