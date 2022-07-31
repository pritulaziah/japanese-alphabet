export enum AlphabetKind {
  Hiragana = "hiragana",
  Katakana = "katakana",
  Kanji = "kanji",
}

export interface Alphabet {
  character: string;
  column: number;
  row?: number;
  ru: string;
  roumaji: string;
}
