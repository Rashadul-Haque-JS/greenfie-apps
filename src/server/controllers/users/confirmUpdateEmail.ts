import { NextApiRequest, NextApiResponse } from "next";
import Users from "@/server/models/users";
import dotenv from "dotenv";
import crypto from "crypto";
dotenv.config();

export default async function confirmEmail(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const confirmToken =
    typeof req.query.confirmToken === "string" ? req.query.confirmToken : "";
  if (confirmToken) {
    const [encryptedEmail, iv] = confirmToken.split(".");
    const decipher = crypto.createDecipheriv(
      "aes-256-cbc",
      process.env.ENCRYPTION_KEY!,
      Buffer.from(iv, "hex")
    );
    let decrypted = decipher.update(encryptedEmail, "hex", "utf-8");
    decrypted += decipher.final("utf-8");
    const email = decrypted;
    const user = await Users.findOne({ confirmToken });
    if (user) {
      await Users.findOneAndUpdate({ confirmToken }, { email });

      // Construct the login URL with query parameters
      const loginUrl = `/?confirmToken=${confirmToken}&email=${email}`;

      // Use client-side JavaScript to handle the redirect
      res
        .status(200)
        .send(
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
