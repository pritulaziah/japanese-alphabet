import { useState } from "react";
import clsx from "clsx";
import { AlphabetCharacter, AlphabetTypes } from "types/alphabet";
import { getAlphabetTypeStyles } from "constants/japanese";
import Search from "./Search";
import Modal from "./Modal/Modal";
import Character from "./Character";
import Examples from "components/Examples";

interface IProps {
  alphabet: AlphabetCharacter[];
  visibleTypes: AlphabetTypes[];
}

interface Cell {
  name?: string;
  value: string;
  hidden?: boolean;
  meaning: (character: AlphabetCharacter) => boolean;
  className: string;
}

function isCharEqual(this: Cell, character: AlphabetCharacter) {
  return character.romaji === this.value;
}

function isLastCharEqual(this: Cell, character: AlphabetCharacter) {
  if ([AlphabetTypes.Youon].includes(character.type)) {
    return false;
  }

  const multipleMeanings = character.romaji.split(" ");
  const targetMeaning =
    multipleMeanings.length === 1
      ? multipleMeanings[0]
      : multipleMeanings[1].replace("(", "").replace(")", "");

  return targetMeaning[targetMeaning.length - 1] === this.value;
}

function isFirstCharEqual(this: Cell, character: AlphabetCharacter) {
  return character.romaji.length > 1 && character.romaji[0] === this.value;
}

function isLastCharsEqual(this: Cell, character: AlphabetCharacter) {
  return (
    [AlphabetTypes.Youon].includes(character.type) &&
    [this.value, this.value.slice(-1)].some((item) =>
      character.romaji.includes(item)
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
  {
    value: "(pause)",
    meaning: isCharEqual,
    hidden: true,
    className: "col-start-8 col-end-11",
  },
];

const rows: Cell[] = [
  {
    name: "",
    value: "gojuuon-chars",
    meaning: (character) =>
      ["a", "i", "u", "e", "o"].includes(character.romaji),
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
          character.romaji.slice(0, character.romaji.length - 1) === item
      );
    },
    className: "row-start-4 row-end-5",
  },
  {
    value: "t",
    meaning(character) {
      return [this.value, "ch", "ts"].some(
        (item) =>
          character.romaji.slice(0, character.romaji.length - 1) === item
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
        return [this.value, "f"].includes(character.romaji[0]);
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
        character.romaji.split(" ").length === 1 &&
        [this.value, "j"].includes(character.romaji[0])
      );
    },
    className: "row-start-15 row-end-16",
  },
  {
    value: "d",
    meaning(character) {
      const multipleMeanings = character.romaji.split(" ");
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
  {
    value: "(pause)",
    meaning: isCharEqual,
    hidden: true,
    className: "row-start-19 row-end-20",
  },
];

const findCell = (cells: Cell[], character: AlphabetCharacter) =>
  cells.find((cell) => cell.meaning(character));

const getCharacterClassNames = (character: AlphabetCharacter) => {
  const row = findCell(rows, character);
  const col = findCell(columns, character);

  return row && col
    ? `${col.className} ${row.className} ${getAlphabetTypeStyles(
        character.type
      ).getCell()}`
    : null;
};

const isFoundChar = (character: AlphabetCharacter, searchValue: string) => {
  if (searchValue.trim() === "") {
    return true;
  }

  const isRu = character.ru.includes(searchValue);
  const isRoumaji = character.romaji.includes(searchValue);
  const isOriginal = character.hiragana.character.includes(searchValue);

  return isRu || isRoumaji || isOriginal;
};

const Table = ({ alphabet, visibleTypes }: IProps) => {
  const [searchValue, setSearchValue] = useState("");
  const [activeChar, setActiveChar] = useState<AlphabetCharacter | null>(null);

  const onChangeSearchValue = (newValue: string) => {
    setSearchValue(newValue);
  };

  const renderHeaderCells = (cells: Cell[], className: string) => {
    return cells
      .filter((cell) => !cell.hidden)
      .map((cell) => (
        <div
          key={cell.name || cell.value}
          className={clsx(
            "flex items-center justify-center p-3",
            cell.className,
            className
          )}
        >
          <span>{cell.name != null ? cell.name : cell.value}</span>
        </div>
      ));
  };

  return (
    <div className="flex flex-col px-6 py-4 flex-1">
      <Search value={searchValue} onChange={onChangeSearchValue} />
      <div className="grid gap-2 grid-cols-table">
        {renderHeaderCells(rows, "col-start-1 col-end-2")}
        {alphabet.map((alphabetCharacter) => {
          const className = getCharacterClassNames(alphabetCharacter);
          const active =
            isFoundChar(alphabetCharacter, searchValue) &&
            visibleTypes.includes(alphabetCharacter.type);

          return className ? (
            <Character
              key={alphabetCharacter.romaji}
              {...alphabetCharacter}
              className={className}
              active={active}
              onClick={() => setActiveChar(alphabetCharacter)}
            />
          ) : null;
        })}
        {renderHeaderCells(columns, "row-start-1 row-end-1")}
      </div>
      <Modal show={!!activeChar} onHide={() => setActiveChar(null)}>
        <Modal.Body>
          {activeChar && (
            <>
              <h3 className="text-4xl mb-3 font-japanese text-gray-900 dark:text-white">
                {activeChar.hiragana.character}
              </h3>
              <div className="flex flex-col mb-2">
                <div>
                  <span className="text-neutral-500 dark:text-neutral-400">
                    На ромадзи:{" "}
                  </span>
                  <span className="text-neutral-900 dark:text-neutral-200">
                    {activeChar.romaji}
                  </span>
                </div>
                <div>
                  <span className="text-neutral-500 dark:text-neutral-400">
                    На русском:{" "}
                  </span>
                  <span className="text-neutral-900 dark:text-neutral-200">
                    {activeChar.ru}
                  </span>
                </div>
              </div>
              {activeChar.hiragana.image && (
                <div className="flex mb-2">
                  <img
                    className="h-auto"
                    src={activeChar.hiragana.image}
                    alt=""
                  />
                </div>
              )}
              <Examples character={activeChar} />
            </>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Table;
