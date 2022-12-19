export interface IWord {
  _id: string;
  japanese: string;
  meaning: string;
}

export interface IWordsData {
  data: IWord[];
  count: number;
}
