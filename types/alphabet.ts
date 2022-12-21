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

export interface AlphabetCharacter {
  _id: string;
  ru: string;
  romaji: string;
  type: AlphabetTypes;
  hiragana: string;
  katakana: string;
}
