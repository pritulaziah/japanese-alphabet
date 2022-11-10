import { AlphabetCharacter } from "types/alphabet";
import { Cell } from "./Table.interface";
import getAlphabetTypeStyles from "utils/getAlphabetTypeStyles";

const findCell = (cells: Cell[], character: AlphabetCharacter) =>
  cells.find((cell) => cell.meaning(character));

export const getCharacterClsxFromCells =
  (rows: Cell[], columns: Cell[]) => (character: AlphabetCharacter) => {
    const row = findCell(rows, character);
    const col = findCell(columns, character);

    return row && col
      ? `${col.className} ${row.className} ${getAlphabetTypeStyles(
          character.type
        ).getCell()}`
      : null;
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
  const isOriginal = character.hiragana.character.includes(searchValue);

  return isRu || isRoumaji || isOriginal;
};
