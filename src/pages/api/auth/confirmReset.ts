import { NextApiRequest, NextApiResponse } from "next";
import Users from "@/server/models/users";
import dotenv from "dotenv";
dotenv.config();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { resetPasswordToken } = req.query;
  if (resetPasswordToken) {
    const user = await Users.findOne({ resetPasswordToken });
    if (user) {
    // Redirect to login page with query parameter to display login form
      res.redirect(`/?resetPasswordToken=${resetPasswordToken}&email=${user.email}`);
    } else {
      console.log('no')
      return res
        .status(404)
        .json({ message: "No user by this query is found" });
    }
  } else {
    console.log('no reset')
    return res.status(400).json({ message: "Invalid confirmation token" });
  }
}
