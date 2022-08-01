import { AlphabetCharacter, AlphabetTypes } from "types/alphabet";
import { alphabetTypeColors } from "./constants";
import Search from "./Search";

interface IProps {
  alphabet: AlphabetCharacter[];
}

interface Cell {
  name?: string;
  value: string;
  hidden?: boolean;
  meaning: (character: AlphabetCharacter) => boolean;
  className: string;
}

function isCharEqual(this: Cell, character: AlphabetCharacter) {
  return (
    [AlphabetTypes.Gojuuon].includes(character.type) &&
    character.roumaji === this.value
  );
}

function isLastCharEqual(this: Cell, character: AlphabetCharacter) {
  if ([AlphabetTypes.Youon].includes(character.type)) {
    return false;
  }

  const multipleMeanings = character.roumaji.split(" ");
  const targetMeaning =
    multipleMeanings.length === 1
      ? multipleMeanings[0]
      : multipleMeanings[1].replace("(", "").replace(")", "");

  return targetMeaning[targetMeaning.length - 1] === this.value;
}

function isFirstCharEqual(this: Cell, character: AlphabetCharacter) {
  return character.roumaji.length > 1 && character.roumaji[0] === this.value;
}

function isLastCharsEqual(this: Cell, character: AlphabetCharacter) {
  return (
    [AlphabetTypes.Youon].includes(character.type) &&
    [this.value, this.value.slice(-1)].some((item) =>
      character.roumaji.includes(item)
    )
  );
}

const columns: Cell[] = [
  {
    value: "a",
    meaning: isLastCharEqual,
    className: "col-start-2 col-end-3",
  },
  {
    value: "i",
    meaning: isLastCharEqual,
    className: "col-start-3 col-end-4",
  },
  {
    value: "u",
    meaning: isLastCharEqual,
    className: "col-start-4 col-end-5",
  },
  {
    value: "e",
    meaning: isLastCharEqual,
    className: "col-start-5 col-end-6",
  },
  {
    value: "o",
    meaning: isLastCharEqual,
    className: "col-start-6 col-end-7",
  },
  {
    value: "n",
    hidden: true,
    meaning: isCharEqual,
    className: "col-start-2 col-end-7 text-center",
  },
  {
    value: "ya",
    meaning: isLastCharsEqual,
    className: "col-start-8 col-end-9",
  },
  {
    value: "yu",
    meaning: isLastCharsEqual,
    className: "col-start-9 col-end-10",
  },
  {
    value: "yo",
    meaning: isLastCharsEqual,
    className: "col-start-10 col-end-11",
  },
];

const rows: Cell[] = [
  {
    name: "",
    value: "gojuuon-chars",
    meaning: (character) =>
      ["a", "i", "u", "e", "o"].includes(character.roumaji),
    className: "row-start-2 row-end-3",
  },
  {
    value: "k",
    meaning: isFirstCharEqual,
    className: "row-start-3 row-end-4",
  },
  {
    value: "s",
    meaning(character) {
      return [this.value, "sh"].some(
        (item) =>
          character.roumaji.slice(0, character.roumaji.length - 1) === item
      );
    },
    className: "row-start-4 row-end-5",
  },
  {
    value: "t",
    meaning(character) {
      return [this.value, "ch", "ts"].some(
        (item) =>
          character.roumaji.slice(0, character.roumaji.length - 1) === item
      );
    },
    className: "row-start-5 row-end-6",
  },
  {
    value: "n",
    meaning: isFirstCharEqual,
    className: "row-start-6 row-end-7",
  },
  {
    value: "h",
    meaning(character) {
      if (character.type === AlphabetTypes.Gojuuon) {
        return [this.value, "f"].includes(character.roumaji[0]);
      } else {
        return isFirstCharEqual.call(this, character);
      }
    },
    className: "row-start-7 row-end-8",
  },
  {
    value: "m",
    meaning: isFirstCharEqual,
    className: "row-start-8 row-end-9",
  },
  {
    value: "y",
    meaning: isFirstCharEqual,
    className: "row-start-9 row-end-10",
  },
  {
    value: "r",
    meaning: isFirstCharEqual,
    className: "row-start-10 row-end-11",
  },
  {
    value: "w",
    meaning: isFirstCharEqual,
    className: "row-start-11 row-end-12",
  },
  {
    name: "ɴ",
    value: "n",
    meaning: isCharEqual,
    className: "row-start-12 row-end-13",
  },
  {
    value: "g",
    meaning: isFirstCharEqual,
    className: "row-start-14 row-end-15",
  },
  {
    value: "z",
    meaning(character) {
      return (
        character.roumaji.split(" ").length === 1 &&
        [this.value, "j"].includes(character.roumaji[0])
      );
    },
    className: "row-start-15 row-end-16",
  },
  {
    value: "d",
    meaning(character) {
      const multipleMeanings = character.roumaji.split(" ");
      const targetMeaning =
        multipleMeanings.length === 1
          ? multipleMeanings[0]
          : multipleMeanings[1].replace("(", "").replace(")", "");

      return [this.value, "dz", "dj"].some(
        (item) => targetMeaning.slice(0, targetMeaning.length - 1) === item
      );
    },
    className: "row-start-16 row-end-17",
  },
  {
    value: "b",
    meaning: isFirstCharEqual,
    className: "row-start-17 row-end-18",
  },
  {
    value: "p",
    meaning: isFirstCharEqual,
    className: "row-start-18 row-end-19",
  },
];

const findCell = (cells: Cell[], character: AlphabetCharacter) =>
  cells.find((cell) => cell.meaning(character));

const getCharacterClassNames = (character: AlphabetCharacter) => {
  const row = findCell(rows, character);
  const col = findCell(columns, character);

  return row && col
    ? `${col.className} ${row.className} ${alphabetTypeColors[character.type]}`
    : null;
};

const Table = ({ alphabet }: IProps) => {
  const renderHeaderCells = (cells: Cell[], className: string) => {
    return cells
      .filter((cell) => !cell.hidden)
      .map((cell) => (
        <div
          key={cell.name || cell.value}
          className={`flex items-center justify-center ${cell.className} ${className}`}
        >
          <span>{cell.name != null ? cell.name : cell.value}</span>
        </div>
      ));
  };

  return (
    <div className="flex flex-col px-6 py-4">
      <Search />
      <div className="grid gap-2 grid-cols-table">
        {renderHeaderCells(rows, "col-start-1 col-end-2")}
        {alphabet.map((alphabetCharacter) => {
          const classNames = getCharacterClassNames(alphabetCharacter);

          if (!classNames) {
            return null;
          }

          return (
            <div
              key={alphabetCharacter.roumaji}
              className={`flex flex-col cursor-pointer p-4 border transition-colors ${classNames}`}
            >
              <span className="text-2xl text-center font-japanese">
                {alphabetCharacter.character}
              </span>
              <span className="text-gray-400">{alphabetCharacter.ru}</span>
              <span className="text-gray-400">{alphabetCharacter.roumaji}</span>
            </div>
          );
        })}
        {renderHeaderCells(columns, "row-start-1 row-end-1")}
      </div>
    </div>
  );
};

export default Table;
