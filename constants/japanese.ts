import { AlphabetTypes } from "types/alphabet";

type AlphabetType = {
  type: AlphabetTypes;
  styles: string;
  ru: string;
};

export const alphabetTypes: AlphabetType[] = [
  {
    type: AlphabetTypes.Gojuuon,
    styles: "bg-blue-300/25 border-blue-300 hover:bg-blue-300/50",
    ru: "годзюон",
  },
  {
    type: AlphabetTypes.Dakuon,
    styles: "bg-orange-300/25 border-orange-300 hover:bg-orange-300/50",
    ru: "дакутэн",
  },
  {
    type: AlphabetTypes.Youon,
    styles: "bg-purple-300/25 border-purple-300 hover:bg-purple-300/50",
    ru: "ёон",
  },
  {
    type: AlphabetTypes.Handakuon,
    styles: "bg-red-300/25 border-red-300 hover:bg-red-300/50",
    ru: "хандакутэн",
  },
  {
    type: AlphabetTypes.Sokuon,
    styles: "bg-gray-300/25 border-gray-300 hover:bg-gray-300/50",
    ru: "сокуон",
  },
];
