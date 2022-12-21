import type { NextApiRequest, NextApiResponse } from "next";
import connectToDatabase from "lib/connectToDatabase";
import { AlphabetCharacter } from "types/alphabet";
import KanaModel from "models/kana";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<AlphabetCharacter[]>
) {
  try {
    await connectToDatabase();
    const data = await KanaModel.find({});

    res.status(200).json(data);
  } catch (error) {
    res.status(500).end();
  }
}
