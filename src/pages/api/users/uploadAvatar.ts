import type { NextApiRequest, NextApiResponse } from "next";
import { parseForm, FormidableError } from "@/server/middlewares/imageUploader";
import Users from "@/server/models/users";
import jwt from "jsonwebtoken";
import { DecodedToken } from "@/utils/types";
import fs from 'fs';
import path from 'path';

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    res.status(405).json({
      file: null,
      message: null,
      error: "Method Not Allowed",
    });
    return;
  }

  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: null, error: "Unauthorized" });
  }

  try {
    const decodedToken = jwt.verify(
      token,
      process.env.JWT_SECRET!
    ) as DecodedToken;

    const user = await Users.findOne({ _id: decodedToken._id }).select(
      "-password -confirmToken -confirmed -resetPasswordToken"
    );
    const { files } = await parseForm(req);

    const avatarFile = Array.isArray(files.image)
  ? files.image[0].newFilename
  : files.image.newFilename;

    if (!avatarFile) {
      res.status(400).json({
        message: null,
        error: "Avatar file is required",
      });
      return;
    }

    // Delete previous avatar file if it exists
  if (user.avatar) {
    const filePath = path.join(`${process.env.ROOT_DIR}/uploads`, user.avatar);
    fs.unlinkSync(filePath);
    console.log(filePath , 'deleted successfully');
  }

    await user.update({
      avatar: avatarFile,
    });
    await user.save();

    res.status(200).json({
      file:avatarFile,
      message: 'Image uploaded successfully',
      error: null,
    });
  } catch (e) {
    if (e instanceof FormidableError) {
      res.status(e.httpCode || 400).json({ message: null, error: e.message });
    } else {
      console.error(e);
      res.status(500).json({ message: null, error: "Internal Server Error" });
    }
  }
};

export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler;
