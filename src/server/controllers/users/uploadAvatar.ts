import { NextApiRequest, NextApiResponse } from "next";
import Users from "@/server/models/users";
import { Request, Response } from "express";
import upload from "@/server/middlewares/imageUpload";
import jwt from 'jsonwebtoken';


declare module "next" {
  export interface NextApiRequest {
    file: any;
  }
}

interface DecodedToken {
    _id: string;
    iat: number;
    exp: number;
  }

type NextApiRequestWithFormData = NextApiRequest &
  Request & {
    files: any[];
  };

type NextApiResponseCustom = NextApiResponse & Response;

const updateAvatar = async (req: NextApiRequest, res: NextApiResponse) => {
  const expressReq = req as NextApiRequestWithFormData;
  const expressRes = res as NextApiResponseCustom;
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  
  upload(expressReq, expressRes, async (err: any) => {
    if (err) {
      return res.status(400).json({ message: err.message });
    }

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET!)as DecodedToken;;
        const user = await Users.findOne({ _id: decodedToken._id }).select('-password -confirmToken -confirmed -resetPasswordToken');
      console.log("user ", user);
      if (user) {
        user.avatar = req.file.buffer;
        await user.save();
        res.status(200).json("User updated successfully");
      } else {
        res.status(404).json({ message: "User not found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Error updating user" });
    }
  });
};

export default updateAvatar;
