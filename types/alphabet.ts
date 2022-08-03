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
  Sokuon = "sokuon",
}

type Example = {
  japanese: string;
  romaji: string;
  meaning: string;
};

type Kana = {
  character: string;
  image: string;
  expamples: Example[];
};

export interface AlphabetCharacter {
  ru: string;
  romaji: string;
  type: AlphabetTypes;
  hiragana: Kana;
}
