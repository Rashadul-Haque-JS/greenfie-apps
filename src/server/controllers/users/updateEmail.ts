import { NextApiRequest, NextApiResponse } from "next";
import Users from "@/server/models/users";
import dotenv from "dotenv";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import { DecodedToken } from "@/utils/types";
dotenv.config();

export default async function updateEmail(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { email } = req.body;
    const userCheck = await Users.findOne({ email });

    if (userCheck) {
      return res.status(400).json({ message: "Email already exist" });
    }
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }
   
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(
      "aes-256-cbc",
      process.env.ENCRYPTION_KEY!,
      iv
    );
    let encrypted = cipher.update(email, "utf-8", "hex");
    encrypted += cipher.final("hex");

    const confirmToken = `${encrypted}.${iv.toString("hex")}`;
    const decodedToken = jwt.verify(
      token,
      process.env.JWT_SECRET!
    ) as DecodedToken;
    const user = await Users.findOne({ _id: decodedToken._id }).select(
      "-password"
    );

    await user.updateOne({ confirmToken });

    const confirmUrl = `${process.env.CLIENT_URL}/api/users/confirm-update-email?confirmToken=${confirmToken}`;
    console.log("Confirm url ", confirmUrl);

    res.json({
      message: `A link has been sent to ${email}. Please confirm your email address.`,
    });
  } catch (error: any) {
    console.log(error.message);
  }
}
