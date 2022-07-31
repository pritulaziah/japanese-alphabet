export enum AlphabetKind {
  Hiragana = "hiragana",
  Katakana = "katakana",
  Kanji = "kanji",
}

export interface AlphabetCharacter {
  character: string;
  ru: string;
  roumaji: string;
}
