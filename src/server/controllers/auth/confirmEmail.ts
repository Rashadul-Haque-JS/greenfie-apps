import { NextApiRequest, NextApiResponse } from "next";
import Users from "@/server/models/users";

export default async function confirmEmail(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.query.confirmToken) {
    const { confirmToken } = req.query;
    const user = await Users.findOne({ confirmToken });
    if (user) {
      await Users.findOneAndUpdate({ confirmToken }, { confirmed: true });

      // Construct the login URL with query parameters
      const loginUrl = `/?confirmToken=${confirmToken}&email=${user.email}`;

      // Use client-side JavaScript to handle the redirect
      res.status(200).send(
        `<html><head><script>window.location.href='${loginUrl}';</script></head><body></body></html>`
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
