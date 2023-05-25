import type { NextApiRequest, NextApiResponse } from "next";
import { parseForm, FormidableError } from "@/server/middlewares/imageUploader";
import jwt from "jsonwebtoken";
import { DecodedToken } from "@/utils/types";
import Users from "@/server/models/users";
import Products from "@/server/models/products";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: null, error: "Unauthorized" });
  }
  const decodedToken = jwt.verify(
    token,
    process.env.JWT_SECRET!
  ) as DecodedToken;

  const user = await Users.findOne(
    { _id: decodedToken._id },
    { password: 0, confirmToken: 0, confirmed: 0, resetPasswordToken: 0 }
  );

  try {
    const { files, fields } = await parseForm(req);
    console.log("fields ");

    const productFile = Array.isArray(files.image)
      ? files.image[0].newFilename
      : files.image.newFilename;

    if (!productFile) {
      res.status(400).json({
        message: null,
        error: "Image file is required",
      });
      return;
    }
    const product = await new Products({
      name: fields.name,
      price: fields.price,
      unit: fields.unit,
      shortDesc: fields.shortDesc,
      description: fields.description,
      image: productFile,
      inStock: fields.inStock,
      isAvailable: fields.available, // corrected field name
      ownerId: user._id,
    });

    await product.save();
    res.status(201).json(product);
  } catch (e) {
    if (e instanceof FormidableError) {
      res.status(e.httpCode || 400).json({ message: null, error: e.message });
    } else {
      console.error(e);
      res.status(500).json({ message: null, error: "Internal Server Error" });
    }
  }
};

export default handler;
