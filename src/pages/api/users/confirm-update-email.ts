import type { NextApiRequest, NextApiResponse } from "next";
import confirmUpdateEmail from "@/server/controllers/users/confirmUpdateEmail";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await confirmUpdateEmail(req, res);
}
