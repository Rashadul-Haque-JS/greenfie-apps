import type { NextApiRequest } from "next";
import { join, extname } from "path";
import formidable from "formidable";
import { mkdir, stat } from "fs/promises";
import { v4 as uuidv4 } from "uuid";
import dotenv from "dotenv";
dotenv.config();

export const parseForm = async (
  req: NextApiRequest
): Promise<{ fields: formidable.Fields; files: formidable.Files }> => {
  return new Promise(async (resolve, reject) => {
    const uploadDir = join(process.env.ROOT_DIR || process.cwd(), `/uploads`);

    try {
      await stat(uploadDir);
    } catch (e: any) {
      if (e.code === "ENOENT") {
        await mkdir(uploadDir, { recursive: true });
      } else {
        console.error(e);
        reject(e);
        return;
      }
    }

    const form = formidable({
      maxFileSize: 1024 * 1024, // 1mb
      uploadDir,
      filename: (_name, _ext, part) => {
        const uniqueSuffix = `${uuidv4()}`;
        const filename = `${part.name || "unknown"}-${uniqueSuffix}${extname(
          part.name || ""
        )}`;
        return filename;
      },
      filter: (part) => {
        return (
          part.name === "image" && (part.mimetype?.includes("image") || false)
        );
      },
    });

    form.parse(req, function (err, fields, files) {
      if (err) reject(err);
      else resolve({ fields, files });
    });
  });
};

export const FormidableError = formidable.errors.FormidableError;
