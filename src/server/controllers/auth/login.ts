import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import type { NextApiRequest, NextApiResponse } from 'next';
import Users from "@/server/models/users";
import { removeUnconfirmedUsers } from '@/server/utils/removeUnconfirmedUsers';
import dotenv from "dotenv";
dotenv.config();

export default async function login(req:NextApiRequest, res:NextApiResponse) {
  //This functions is called temporary here...it will be called in suitable place later.
    await removeUnconfirmedUsers()
  if (req.method === 'POST') {
    const { email, password } = req.body;
    const user  = await Users.findOne({ email})
    if(!user)return res.status(404).json({ message: 'User is not registered' });
    if(!user.confirmed)return res.status(404).json({ message: 'User email not varified' })
    const isPasswordValid = await compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Password is not valid' });
    }
    // Generate JWT token
    const token = sign({ email }, process.env.JWT_SECRET? process.env.JWT_SECRET:'', { expiresIn: '1h' });
    // Save JWT token to cookies or local storage
    res.setHeader('Set-Cookie', `token=${token}; HttpOnly; Path=/`);
    const {_id,name} = user
    return res.status(200).json({ message: 'Login successful', auth:{_id,name}});
  } else {
    return res.status(405).json({ message: 'Method not allowed' });
  }
}
