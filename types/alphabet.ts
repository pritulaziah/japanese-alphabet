export enum AlphabetForms {
  Hiragana = "hiragana",
  Katakana = "katakana",
}

export enum AlphabetTypes {
  Gojuuon = "gojuuon",
  Dakuon = "dakuon",
  Youon = "youon",
  Handakuon = "handakuon",
  Sokuon = "sokuon",
}

type AlphabetExample = {
  japanese: string;
  romaji: string;
  meaning: string;
};

export type Kana = {
  character: string;
  image: string;
  examples: AlphabetExample[];
};

export interface AlphabetCharacter {
  ru: string;
  romaji: string;
  type: AlphabetTypes;
  hiragana: Kana;
  katakana: Kana;
}
