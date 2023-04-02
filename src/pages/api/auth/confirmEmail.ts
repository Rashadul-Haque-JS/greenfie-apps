import { NextApiRequest, NextApiResponse } from "next";
import Users from "@/server/models/users";
import dotenv from "dotenv";
dotenv.config();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.query.confirmToken) {
    const { confirmToken } = req.query;
    const user = await Users.findOne({ confirmToken });
    if (user) {
      await Users.findOneAndUpdate({ confirmToken }, { confirmed: true });
      // Redirect to login page with query parameter to display login form
      res.redirect(`/?confirmToken=${confirmToken}&email=${user.email}`);
    } else {
      return res
        .status(404)
        .json({ message: "No user by this query is found" });
    }
  } else {
    return res.status(400).json({ message: "Invalid confirmation token" });
  }
}
