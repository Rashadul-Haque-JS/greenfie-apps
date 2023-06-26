import type { NextApiRequest, NextApiResponse } from "next";
import updateEmail from "@/server/controllers/users/updateEmail";
import connectToDatabase from "@/server/connection";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  connectToDatabase();
  await updateEmail(req, res);
}
