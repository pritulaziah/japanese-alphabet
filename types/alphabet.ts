export enum AlphabetKind {
  Hiragana = "hiragana",
  Katakana = "katakana",
  Kanji = "kanji",
}

export enum AlphabetTypes {
  Gojuuon = "gojuuon",
  Dakuon = "dakuon",
  Youon = "youon",
  Handakuon = "handakuon",
}

export interface AlphabetCharacter {
  character: string;
  ru: string;
  roumaji: string;
  type: AlphabetTypes;
}
