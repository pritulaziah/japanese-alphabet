import Table from "components/japanese/Table";
import { NextPage } from "next";
import { Alphabet } from "types/alphabet";

interface IProps {}

const exampleTableData: Alphabet[] = [
  { character: "あ", column: 11, row: 1, ru: "а", roumaji: "a" },
  { character: "か", column: 10, row: 1, ru: "ка", roumaji: "ka" },
  { character: "さ", column: 9, row: 1, ru: "са", roumaji: "sa" },
  { character: "た", column: 8, row: 1, ru: "та", roumaji: "ta" },
  { character: "な", column: 7, row: 1, ru: "на", roumaji: "na" },
  { character: "は", column: 6, row: 1, ru: "ха", roumaji: "ha" },
  { character: "ま", column: 5, row: 1, ru: "ма", roumaji: "ma" },
  { character: "や", column: 4, row: 1, ru: "я", roumaji: "ya" },
  { character: "ら", column: 3, row: 1, ru: "ра", roumaji: "ra" },
  { character: "わ", column: 2, row: 1, ru: "ва", roumaji: "wa" },
  { character: "ん", column: 1, ru: "н", roumaji: "n" },
  { character: "い", column: 11, row: 2, ru: "и", roumaji: "i" },
  { character: "き", column: 10, row: 2, ru: "ки", roumaji: "ki" },
  { character: "し", column: 9, row: 2, ru: "си", roumaji: "shi" },
  { character: "ち", column: 8, row: 2, ru: "ти", roumaji: "chi" },
  { character: "に", column: 7, row: 2, ru: "ни", roumaji: "ni" },
  { character: "ひ", column: 6, row: 2, ru: "хи", roumaji: "hi" },
  { character: "み", column: 5, row: 2, ru: "ми", roumaji: "mi" },
  { character: "り", column: 3, row: 2, ru: "ри", roumaji: "ri" },
  { character: "う", column: 11, row: 3, ru: "у", roumaji: "u" },
  { character: "く", column: 10, row: 3, ru: "ку", roumaji: "ku" },
  { character: "す", column: 9, row: 3, ru: "су", roumaji: "su" },
  { character: "つ", column: 8, row: 3, ru: "цу", roumaji: "tsu" },
  { character: "ぬ", column: 7, row: 3, ru: "ну", roumaji: "nu" },
  { character: "ふ", column: 6, row: 3, ru: "фу", roumaji: "fu" },
  { character: "む", column: 5, row: 3, ru: "му", roumaji: "mu" },
  { character: "ゆ", column: 4, row: 3, ru: "ю", roumaji: "yu" },
  { character: "る", column: 3, row: 3, ru: "ру", roumaji: "ru" },
  { character: "え", column: 11, row: 4, ru: "э", roumaji: "e" },
  { character: "け", column: 10, row: 4, ru: "кэ", roumaji: "ke" },
  { character: "せ", column: 9, row: 4, ru: "сэ", roumaji: "se" },
  { character: "て", column: 8, row: 4, ru: "тэ", roumaji: "te" },
  { character: "ね", column: 7, row: 4, ru: "нэ", roumaji: "ne" },
  { character: "へ", column: 6, row: 4, ru: "хэ", roumaji: "he" },
  { character: "め", column: 5, row: 4, ru: "мэ", roumaji: "me" },
  { character: "れ", column: 3, row: 4, ru: "рэ", roumaji: "re" },
  { character: "お", column: 11, row: 5, ru: "о", roumaji: "o" },
  { character: "こ", column: 10, row: 5, ru: "ко", roumaji: "ko" },
  { character: "そ", column: 9, row: 5, ru: "со", roumaji: "so" },
  { character: "と", column: 8, row: 5, ru: "то", roumaji: "to" },
  { character: "の", column: 7, row: 5, ru: "но", roumaji: "no" },
  { character: "ほ", column: 6, row: 5, ru: "хо", roumaji: "ho" },
  { character: "も", column: 5, row: 5, ru: "мо", roumaji: "mo" },
  { character: "よ", column: 4, row: 5, ru: "ё", roumaji: "yo" },
  { character: "ろ", column: 3, row: 5, ru: "ро", roumaji: "ro" },
  { character: "を", column: 2, row: 5, ru: "о", roumaji: "wo" },
];
const Learn: NextPage<IProps> = () => {
  return (
    <div className="min-h-screen bg-gray-900 p-10">
      <Table data={exampleTableData} />
    </div>
  );
};

export default Learn;
