import { NextApiRequest, NextApiResponse } from "next";
import Users from "@/server/models/users";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import crypto from "crypto";
//import nodemailer from "nodemailer";
dotenv.config();
// const transporter = nodemailer.createTransport({
//   host: process.env.SMTP_HOST,
//   port: parseInt(process.env.SMTP_PORT!, 10),
//   secure: process.env.SMTP_SECURE === 'true',
//   auth: {
//     user: process.env.SMTP_USERNAME,
//     pass: process.env.SMTP_PASSWORD,
//   },
// });

export default async function register(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { password, email } = req.body;
    const userCheck = await Users.findOne({ email });
    if (userCheck) {
      return res.status(400).json({ error: "User already exists" });
    }
    const confirmToken = crypto.randomBytes(16).toString("hex");
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);
    await Users.create({
      ...req.body,
      password : hashedPassword,
      confirmToken
    });
    
    const confirmUrl = `${process.env.CLIENT_URL}/api/auth/confirmEmail?confirmToken=${confirmToken}`;
    console.log('Confirm url ',confirmUrl)

    // const mailOptions = {
    //  from: process.env.SMTP_SENDER_EMAIL,
   //   to: email,
   //   subject: 'Confirm email',
    //  text: `Please confirm your email address by clicking this link: ${confirmUrl}`,
    // };

    // let info = await transporter.sendMail(mailOptions);
    // console.log("Email sent: " + info.response);

    res.json({
      message: `Registration is successful. A link has been sent to ${email}. Please confirm your email address.`,
    });
  } catch (error: any) {
    console.log(error.message);
  }
}
