import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import type { NextApiRequest, NextApiResponse } from 'next';
import Users from "@/server/models/users";
import dotenv from "dotenv";
dotenv.config();
// This is a sample user object. In a real-world application, you would get this from a database.

export default async function handler(req:NextApiRequest, res:NextApiResponse) {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    const user  = await Users.findOne({ email})
    if(!user)return res.status(404).json({ message: 'User not found' });

    const isPasswordValid = await compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    // Generate JWT token
    const token = sign({ email }, process.env.JWT_SECRET? process.env.JWT_SECRET:'', { expiresIn: '1h' });
    // Save JWT token to cookies or local storage
    res.setHeader('Set-Cookie', `token=${token}; HttpOnly; Path=/`);
    return res.status(200).json({ message: 'Login successful' });
  } else {
    return res.status(405).json({ message: 'Method not allowed' });
  }
}