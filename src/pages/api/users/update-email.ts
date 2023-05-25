import type { NextApiRequest, NextApiResponse } from "next";
import updateEmail from "@/server/controllers/users/updateEmail";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await updateEmail(req, res);
}
