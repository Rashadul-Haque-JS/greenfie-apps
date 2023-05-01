import { NextApiRequest, NextApiResponse } from 'next';
import Users from '@/server/models/users';
import { hash } from 'bcryptjs';
import bcrypt from "bcryptjs";

export default async function setNewPassword(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method Not Allowed' });
    return;
  }
  const { email, password } = req.body;
  // Check if email, old password, and new password are present in request body
  if (!email || !password) {
    res.status(400).json({ error: 'Invalid Request' });
    return;
  }
  // Get user by email from database
  const user = await Users.findOne({email});
  // Check if user exists
  if (!user) {
    res.status(400).json({ error: 'Invalid email' });
    return;
  }
  // Hash new password
  const salt = await bcrypt.genSalt(12);
  const hashedPassword = await hash(password, salt);
  // Update user's password in database
  await user.updateOne({ password: hashedPassword });
  res.status(200).json({ message: 'Password reset successful!' });
}
