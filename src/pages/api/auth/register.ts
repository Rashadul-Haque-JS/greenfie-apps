import { NextApiRequest, NextApiResponse } from "next";
import Users from "@/server/models/users";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import crypto from "crypto";
//import nodemailer from "nodemailer";

dotenv.config();
// const transporter = nodemailer.createTransport({
//   service: process.env.MAIL_SERVICE,
//   auth: {
//     user: process.env.MAIL_USERNAME,
//     pass: process.env.MAIL_PASSWORD,
//   },
// });

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { password, email } = req.body;
    const userCheck = await Users.findOne({ email });
    if (userCheck) {
      return res.status(400).json({ message: "User already exists" });
    }
    const confirmToken = crypto.randomBytes(16).toString("hex");
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);
  
    await Users.create({
      ...req.body,
      password : hashedPassword,
      confirmToken
    });
    
    const confirmUrl = `${process.env.GREENFIE_DOMAIN}/api/auth/confirm-email?confirmToken=${confirmToken}`;
    console.log('Confirm url ',confirmUrl)

    // const mailOptions = {
    //   from: process.env.MAIL_FROM,
    //   to: email,
    //   subject: "Confirm your email",
    //   text: `Please confirm your email address by clicking this link: ${confirmUrl}`,
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
