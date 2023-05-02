import { compare } from 'bcryptjs';
import jwt from 'jsonwebtoken';
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
    const {_id} = user
    const token = jwt.sign({ _id }, process.env.JWT_SECRET? process.env.JWT_SECRET:'', { expiresIn: '1h' });

    // Set cookie
    res.setHeader('Set-Cookie', `token=${token}; Path=/; HttpOnly; Max-Age=${3600}`);

    // Send response
    return res.status(200).json({ message: 'Login successful' });
  } else {
    return res.status(405).json({ message: 'Method not allowed' });
  }
}
