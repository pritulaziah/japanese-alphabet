import type { NextApiRequest, NextApiResponse } from "next";
import Word from "types/word";
import words from "../../words.json";

type Data = {
  words: Word[];
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(200).json({ words: words as Word[] });
}
