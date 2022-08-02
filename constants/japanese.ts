import { AlphabetTypes } from "types/alphabet";

type AlphabetType = {
  type: AlphabetTypes;
  styles: string;
  ru: string;
};

export const alphabetTypes: AlphabetType[] = [
  {
    type: AlphabetTypes.Gojuuon,
    styles:
      "bg-blue-400/50 border-blue-400 hover:bg-blue-400/75 dark:bg-blue-300/25 dark:border-blue-300 dark:hover:bg-blue-300/50",
    ru: "годзюон",
  },
  {
    type: AlphabetTypes.Dakuon,
    styles:
      "bg-orange-400/50 border-orange-400 hover:bg-orange-400/75 dark:bg-orange-300/25 dark:border-orange-300 dark:hover:bg-orange-300/50",
    ru: "дакутэн",
  },
  {
    type: AlphabetTypes.Handakuon,
    styles:
      "bg-red-400/50 border-red-400 hover:bg-red-400/75 dark:bg-red-300/25 dark:border-red-300 dark:hover:bg-red-300/50",
    ru: "хандакутэн",
  },
  {
    type: AlphabetTypes.Youon,
    styles:
      "bg-purple-400/50 border-purple-400 hover:bg-purple-400/75 dark:bg-purple-300/25 dark:border-purple-300 dark:hover:bg-purple-300/50",
    ru: "ёон",
  },
  {
    type: AlphabetTypes.Sokuon,
    styles:
      "bg-gray-300/50 border-gray-300 hover:bg-gray-300/75 dark:bg-gray-300/25 dark:border-gray-300 dark:hover:bg-gray-300/50",
    ru: "сокуон",
  },
];
