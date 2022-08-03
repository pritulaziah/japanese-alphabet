import { AlphabetTypes } from "types/alphabet";

type AlphabetTypeStyles = {
  bg: string;
  border: string;
  hover: string;
  text?: string;
  getCell: () => string;
  getHighlight?: () => string;
};

type AlphabetType = {
  type: AlphabetTypes;
  styles: AlphabetTypeStyles;
  ru: string;
};

export const getAlphabetTypeStyles = (type: AlphabetTypes) => {
  const alphabetType = alphabetTypes.find(
    (alphabetType) => alphabetType.type === type
  );

  return alphabetType!.styles;
};

function getCell(this: AlphabetTypeStyles) {
  return `${this.bg} ${this.border} ${this.hover}`;
}

function getHighlight(this: AlphabetTypeStyles) {
  return `${this.bg} ${this.text}`;
}

export const alphabetTypes: AlphabetType[] = [
  {
    type: AlphabetTypes.Gojuuon,
    styles: {
      bg: "bg-blue-400/50 dark:bg-blue-300/25",
      border: "border-blue-400 dark:border-blue-300",
      hover: "hover:bg-blue-400/75 dark:hover:bg-blue-300/50",
      text: "text-blue-900",
      getCell,
      getHighlight,
    },
    ru: "годзюон",
  },
  {
    type: AlphabetTypes.Dakuon,
    styles: {
      bg: "bg-orange-400/50 dark:bg-orange-300/25",
      border: "border-orange-400 dark:border-orange-300",
      hover: "hover:bg-orange-400/75 dark:hover:bg-orange-300/50",
      text: "text-orange-900",
      getCell,
      getHighlight,
    },
    ru: "дакутэн",
  },
  {
    type: AlphabetTypes.Handakuon,
    styles: {
      bg: "bg-red-400/50 dark:bg-red-300/25",
      border: "border-red-400 dark:border-red-300",
      hover: "hover:bg-red-400/75 dark:hover:bg-red-300/50",
      text: "text-red-900",
      getCell,
      getHighlight,
    },
    ru: "хандакутэн",
  },
  {
    type: AlphabetTypes.Youon,
    styles: {
      bg: "bg-purple-400/50 dark:bg-purple-300/25",
      border: "border-purple-400 dark:border-purple-300",
      hover: "hover:bg-purple-400/75 dark:hover:bg-purple-300/50",
      text: "text-purple-900",
      getCell,
      getHighlight,
    },
    ru: "ёон",
  },
  {
    type: AlphabetTypes.Sokuon,
    styles: {
      bg: "bg-gray-300/50 dark:bg-gray-300/25",
      border: "border-gray-300 dark:border-gray-300",
      hover: "over:bg-gray-300/75 dark:hover:bg-gray-300/50",
      getCell,
    },
    ru: "сокуон",
  },
];
