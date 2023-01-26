import type { NextApiRequest, NextApiResponse } from "next";
import connectToDatabase from "lib/connectToDatabase";
import { IWord } from "types/word";
import WordsModel from "models/words";
import { DEFAULT_LIMIT } from "constants/index";
import isNumericQuery from "utils/isNumericQuery";
import isString from "utils/isString";
import axios from "axios";

export type WordsParams = { limit?: number; search: string; offset: number };
export const getAPIWords = ({
  offset,
  search,
  limit = DEFAULT_LIMIT,
}: WordsParams) =>
  axios.get<IWordsData>("/api/words", {
    params: {
      limit,
      offset,
      search,
    },
  });

export interface IWordsData {
  data: IWord[];
  count: number;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IWordsData>
) {
  const requestMethod = req.method;

  switch (requestMethod) {
    case "POST":
      const { japanese, romaji, meaning } = req.body;

      try {
        await WordsModel.findOneAndUpdate(
          { japanese },
          { japanese, romaji, meaning },
          { upsert: true }
        );

        res.status(200).end();
      } catch (error) {
        res.status(500).end();
      }
      break;
    case "GET":
      const { limit, offset, search } = req.query;
      const numLimit = isNumericQuery(limit) ? Number(limit) : DEFAULT_LIMIT;
      const numOffset = isNumericQuery(offset) ? Number(offset) : 0;
      const searchQuery = new RegExp(
        isString(search) ? String(search) : "",
        "i"
      );

      try {
        await connectToDatabase();
        const query = {
          $or: [
            {
              meaning: searchQuery,
            },
            {
              japanese: searchQuery,
            },
          ],
        };
        const [data, count] = await Promise.all([
          WordsModel.find(query).limit(numLimit).skip(numOffset),
          WordsModel.count(query),
        ]);

        res.status(200).json({ data, count });
      } catch (error) {
        res.status(500).end();
      }
      break;
    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${requestMethod} Not Allowed`);
      break;
  }
}
