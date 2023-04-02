import { NextApiRequest, NextApiResponse } from 'next';
import Users from '@/server/models/users';
import { compare, hash } from 'bcryptjs';
import bcrypt from "bcryptjs";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method Not Allowed' });
    return;
  }

  const { email, oldPassword, newPassword } = req.body;
  // Check if email, old password, and new password are present in request body
  if (!email || !oldPassword || !newPassword) {
    res.status(400).json({ error: 'Invalid Request' });
    return;
  }
  // Get user by email from database
  const user = await Users.findOne(email);
  // Check if user exists
  if (!user) {
    res.status(400).json({ error: 'Invalid Email or Password' });
    return;
  }
  // Compare old password with hashed password in database
  const passwordMatch = await compare(oldPassword, user.password);

  if (!passwordMatch) {
    res.status(400).json({ error: 'Invalid Email or Password' });
    return;
  }
  // Hash new password
  const salt = await bcrypt.genSalt(12);
  const hashedPassword = await hash(newPassword, salt);
  // Update user's password in database
  await user.updateOne({ password: hashedPassword });
  res.status(200).json({ message: 'Password update successful' });
}
