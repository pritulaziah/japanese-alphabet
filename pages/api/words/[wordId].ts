import type { NextApiRequest, NextApiResponse } from "next";
import WordsModel from "models/words";
import mongoose from "mongoose";
import isString from "utils/isString";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const requestMethod = req.method;

  switch (requestMethod) {
    case "DELETE":
      const { wordId } = req.query;
      const wordIdStr = isString(wordId) ? String(wordId) : "";

      try {
        await WordsModel.deleteOne({
          _id: new mongoose.mongo.ObjectId(wordIdStr),
        });

        res.status(200).end();
      } catch (error) {
        res.status(500).end();
      }
      break;
    default:
      res.setHeader("Allow", ["DELETE"]);
      res.status(405).end(`Method ${requestMethod} Not Allowed`);
      break;
  }
}
