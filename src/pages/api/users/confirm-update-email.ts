import type { NextApiRequest, NextApiResponse } from "next";
import confirmUpdateEmail from "@/server/controllers/users/confirmUpdateEmail";
import connectToDatabase from "@/server/connection";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  connectToDatabase();
  await confirmUpdateEmail(req, res);
}
