import { AlphabetCharacter } from "types/alphabet";

interface IProps {
  alphabet: AlphabetCharacter[];
}

interface Cell {
  name?: string;
  value: string;
  visible?: boolean;
  meaning: (roumaji: string) => boolean;
  className: string;
}

const getVisibleCell = (cell: Cell) => cell.visible == null || cell.visible;

function isLastCharEqual(this: Cell, roumaji: string) {
  return roumaji[roumaji.length - 1] === this.value;
}

function isFirstCharEqual(this: Cell, roumaji: string) {
  return roumaji.length === 2 && roumaji[0] === this.value;
}

const rows: Cell[] = [
  {
    value: "a",
    meaning: isLastCharEqual,
    className: "row-start-2 row-end-3",
  },
  {
    value: "i",
    meaning: isLastCharEqual,
    className: "row-start-3 row-end-4",
  },
  {
    value: "u",
    meaning: isLastCharEqual,
    className: "row-start-4 row-end-5",
  },
  {
    value: "e",
    meaning: isLastCharEqual,
    className: "row-start-5 row-end-6",
  },
  {
    value: "o",
    meaning: isLastCharEqual,
    className: "row-start-6 row-end-7",
  },
  {
    value: "n",
    visible: false,
    meaning(roumaji) {
      return roumaji === this.value;
    },
    className: "row-start-2 row-end-7 items-center justify-center",
  },
];

const columns: Cell[] = [
  {
    name: "",
    value: "all-row-chars",
    meaning: (roumaji) =>
      rows
        .filter(getVisibleCell)
        .map((row) => row.value)
        .some((row) => row === roumaji),
    className: "col-start-11 col-end-12",
  },
  {
    value: "k",
    meaning: isFirstCharEqual,
    className: "col-start-10 col-end-11",
  },
  {
    value: "s",
    meaning: isFirstCharEqual,
    className: "col-start-9 col-end-10",
  },
  {
    value: "t",
    meaning(roumaji: string) {
      return roumaji.length === 3
        ? ["ts", "ch"].includes(roumaji.slice(0, 2))
        : isFirstCharEqual.call(this, roumaji);
    },
    className: "col-start-8 col-end-9",
  },
  {
    value: "n",
    meaning: isFirstCharEqual,
    className: "col-start-7 col-end-8",
  },
  {
    value: "h",
    meaning(roumaji: string) {
      return roumaji.length === 2 && [this.value, "f"].includes(roumaji[0]);
    },
    className: "col-start-6 col-end-7",
  },
  {
    value: "m",
    meaning: isFirstCharEqual,
    className: "col-start-5 col-end-6",
  },
  {
    value: "y",
    meaning: isFirstCharEqual,
    className: "col-start-4 col-end-5",
  },
  {
    value: "r",
    meaning: isFirstCharEqual,
    className: "col-start-3 col-end-4",
  },
  {
    value: "w",
    meaning: isFirstCharEqual,
    className: "col-start-2 col-end-3",
  },
  {
    name: "ɴ",
    value: "n",
    meaning(roumaji) {
      return roumaji === this.value;
    },
    className: "col-start-1 col-end-2",
  },
];

const getCellClassNames = (abc: AlphabetCharacter) => {
  const finder = (array: Cell[]) =>
    array.find((item) => item.meaning(abc.roumaji));

  const row = finder(rows);
  const col = finder(columns);

  if (col && row) {
    return `${col.className} ${row.className}`;
  }

  return null;
};

const Table = ({ alphabet }: IProps) => {
  const renderHeaderCells = (cells: Cell[], className: string) => {
    return cells.filter(getVisibleCell).map((cell) => (
      <div
        key={cell.name || cell.value}
        className={`flex items-center justify-center ${cell.className} ${className}`}
      >
        <span>{cell.name != null ? cell.name : cell.value}</span>
      </div>
    ));
  };

  return (
    <div className="grid text-white gap-2">
      {renderHeaderCells(rows, "col-start-12 col-end-12")}
      {alphabet.map((alphabetCharacter) => {
        const classNames = getCellClassNames(alphabetCharacter);

        if (!classNames) {
          return null;
        }

        return (
          <div
            key={alphabetCharacter.roumaji}
            className={`flex flex-col cursor-pointer p-4 border transition-colors ${getCellClassNames(
              alphabetCharacter
            )} border-gray-100 bg-transparent hover:bg-gray-700`}
          >
            <span className="text-2xl text-center font-japanese">
              {alphabetCharacter.character}
            </span>
            <span className="text-base text-gray-400">
              {alphabetCharacter.ru}
            </span>
            <span className="text-base text-gray-400">
              {alphabetCharacter.roumaji}
            </span>
          </div>
        );
      })}
      {renderHeaderCells(columns, "row-start-1 row-end-1")}
    </div>
  );
};

export default Table;
