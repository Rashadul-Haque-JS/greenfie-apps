import { NextApiRequest, NextApiResponse } from 'next';
import { parseCookies } from 'nookies';
import Users from "@/server/models/users";
import jwt from 'jsonwebtoken';

interface DecodedToken {
    _id: string;
    iat: number;
    exp: number;
  }

export default async function getUserById(req: NextApiRequest, res: NextApiResponse) {
  const cookies = parseCookies({ req });
  const token = cookies.token;
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  
  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET!)as DecodedToken;;
    const user = await Users.findOne({ _id: decodedToken._id }).select('-password');
    return res.status(200).json({ user });
  } catch (err) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
}