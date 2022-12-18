import type { NextApiRequest, NextApiResponse } from "next";
import connectToDatabase from "lib/connectToDatabase";
import { IWord } from "types/word";
import { Words } from "models";
import isNumeric from "utils/isNumeric";
import { DEFAULT_LIMIT } from "constants/index";

type Data = {
  words: IWord[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  let { limit } = req.query;
  const numLimit =
    typeof limit === "string" && isNumeric(limit)
      ? Number(limit)
      : DEFAULT_LIMIT;

  try {
    await connectToDatabase();
    const words = await Words.find({}).limit(numLimit);

    res.status(200).json({ words });
  } catch (error) {
    res.status(500).end();
  }
}
