import { AlphabetTypes } from "types/alphabet";

type AlphabetTypeColor = {
  [key in AlphabetTypes]: string;
};

export const alphabetTypeColors: AlphabetTypeColor = {
  [AlphabetTypes.Gojuuon]:
    "bg-blue-300/25 border-blue-300 hover:bg-blue-300/50",
  [AlphabetTypes.Dakuon]:
    "bg-orange-300/25 border-orange-300 hover:bg-orange-300/50",
  [AlphabetTypes.Youon]:
    "bg-purple-300/25 border-purple-300 hover:bg-purple-300/50",
  [AlphabetTypes.Handakuon]: "bg-red-300/25 border-red-300 hover:bg-red-300/50",
};
