import type { NextApiRequest, NextApiResponse } from "next";
import connectToDatabase from "lib/connectToDatabase";
import { IWord } from "types/word";
import { Words } from "models";

type Data = {
  words: IWord[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  await connectToDatabase();
  const words = await Words.find({});

  res.status(200).json({ words });
}
