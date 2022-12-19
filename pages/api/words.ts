import type { NextApiRequest, NextApiResponse } from "next";
import connectToDatabase from "lib/connectToDatabase";
import { IWordsData } from "types/word";
import { Words } from "models";
import { DEFAULT_LIMIT } from "constants/index";
import isNumericQuery from "utils/isNumericQuery";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IWordsData>
) {
  const { limit, offset } = req.query;
  const numLimit = isNumericQuery(limit) ? Number(limit) : DEFAULT_LIMIT;
  const numOffset = isNumericQuery(offset) ? Number(offset) : 0;

  try {
    await connectToDatabase();
    const [data, count] = await Promise.all([
      Words.find({}).limit(numLimit).skip(numOffset),
      Words.count(),
    ]);

    res.status(200).json({ data, count });
  } catch (error) {
    res.status(500).end();
  }
}
