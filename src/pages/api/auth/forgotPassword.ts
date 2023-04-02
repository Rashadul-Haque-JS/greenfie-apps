import { NextApiRequest, NextApiResponse } from "next";
import crypto from "crypto";
import Users from "@/server/models/users";
import nodemailer from 'nodemailer';

// const transporter = nodemailer.createTransport({
//   host: process.env.SMTP_HOST,
//   port: parseInt(process.env.SMTP_PORT!, 10),
//   secure: process.env.SMTP_SECURE === 'true',
//   auth: {
//     user: process.env.SMTP_USERNAME,
//     pass: process.env.SMTP_PASSWORD,
//   },
// });

export default async function handler(req:NextApiRequest, res:NextApiResponse) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method Not Allowed" });
    return;
  }
  const { email } = req.body;
  // Check if email is present in request body and is valid
  if (!email) {
    res.status(400).json({ error: "Invalid email address" });
    return;
  }
  try {
    // Generate password reset token
    const resetPasswordToken = crypto.randomBytes(20).toString("hex");
    // Find user by email and update their reset token and token expiry time
    const user = await Users.findOneAndUpdate(
      { email },
      {
        resetPasswordToken,
        resetPasswordTokenExpiry: Date.now() + 3600000, // Token expires in 1 hour
      },
      { new: true }
    );
    // If no user is found for this email, return an error
    if (!user) {
      res.status(404).json({ error: "No user found for this email address" });
      return;
    }
    const confirmReset = `${process.env.CLIENT_URL}/api/auth/confirmReset?resetPasswordToken=${resetPasswordToken}`;
    console.log('Confirm url ',confirmReset)
    // Send password reset email
    // const emailSent = await transporter.sendMail({
    //     from: process.env.SMTP_SENDER_EMAIL,
    //     to: email,
    //     subject: 'Reset Your Password',
    //     html: `
    //       <p>Click the following link to reset your password:</p>
    //       <a href="${process.env.CLIENT_URL}/api/auth/confirm-reset?resetPasswordToken=${resetPasswordToken}
    //     `,
    //   });
    //   console.log('Password reset email sent: %s', emailSent.messageId);
    // if (!emailSent) {
    //   res.status(500).json({ error: "Failed to send password reset email" });
    //   return;
    // }
    res.status(200).json({  message: `Request is successful. A reset link has been sent to ${email}. Thank you!`,});
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while processing your request" });
  }
};


