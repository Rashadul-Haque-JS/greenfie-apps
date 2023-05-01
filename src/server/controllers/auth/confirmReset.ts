import { NextApiRequest, NextApiResponse } from "next";
import Users from "@/server/models/users";
import dotenv from "dotenv";
dotenv.config();

export default async function confirmReset(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { resetPasswordToken } = req.query;
  if (resetPasswordToken) {
    const user = await Users.findOne({ resetPasswordToken });
    if (user) {
      // Construct the login URL with query parameters
      const resetUrl = `/?resetPasswordToken=${resetPasswordToken}&email=${user.email}`;

      // Use client-side JavaScript to handle the redirect
      res.status(200).send(
        `<html><head><script>window.location.href='${resetUrl}';</script></head><body></body></html>`
      );
    } else {
      return res
        .status(404)
        .json({ message: "No user by this query is found" });
    }
  } else {
    return res.status(400).json({ message: "Invalid confirmation token" });
  }
}
