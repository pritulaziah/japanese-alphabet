import { AlphabetCharacter } from "types/alphabet";
import { Cell } from "./KanaTable.interface";
import getAlphabetTypeStyles from "utils/getAlphabetTypeStyles";

export const getCharacterClsxFromCells = (rows: Cell[], columns: Cell[]) => {
  const findCell = (cells: Cell[], character: AlphabetCharacter) =>
    cells.find((cell) => cell.meaning(character));

  return (character: AlphabetCharacter) => {
    const row = findCell(rows, character);
    const col = findCell(columns, character);

    return row && col
      ? `${col.className} ${row.className} ${getAlphabetTypeStyles(
          character.type
        ).getCell()}`
      : null;
  };
};

export const isFoundChar = (
  character: AlphabetCharacter,
  searchValue: string
) => {
  if (searchValue.trim() === "") {
    return true;
  }

  const isRu = character.ru.includes(searchValue);
  const isRoumaji = character.romaji.includes(searchValue);
  const isJapanese = character.hiragana.includes(searchValue);

  return isRu || isRoumaji || isJapanese;
};
