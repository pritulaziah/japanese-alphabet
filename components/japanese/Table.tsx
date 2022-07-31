import { AlphabetCharacter } from "types/alphabet";

interface IProps {
  alphabet: AlphabetCharacter[];
}

interface Col {
  name: string;
  visible?: boolean;
  meaning: (roumaji: string) => boolean;
  className: string;
}

interface Row extends Col {
  color: string;
}

function isLastCharEqual(this: Row | Col, roumaji: string) {
  return roumaji[roumaji.length - 1] === this.name;
}

function isFirstCharEqual(this: Row | Col, roumaji: string) {
  return roumaji.length === 2 && roumaji[0] === this.name;
}

const rows: Row[] = [
  {
    name: "a",
    meaning: isLastCharEqual,
    color: "bg-blue-300/25 border-blue-300 hover:bg-blue-300/50",
    className: "row-start-2 row-end-3",
  },
  {
    name: "i",
    meaning: isLastCharEqual,
    color: "bg-orange-300/25 border-orange-300 hover:bg-orange-300/50",
    className: "row-start-3 row-end-4",
  },
  {
    name: "u",
    meaning: isLastCharEqual,
    color: "bg-purple-300/25 border-purple-300 hover:bg-purple-300/50",
    className: "row-start-4 row-end-5",
  },
  {
    name: "e",
    meaning: isLastCharEqual,
    color: "bg-emerald-300/25 border-emerald-300 hover:bg-emerald-300/50",
    className: "row-start-5 row-end-6",
  },
  {
    name: "o",
    meaning: isLastCharEqual,
    color: "bg-red-300/25 border-red-300 hover:bg-red-300/50",
    className: "row-start-6 row-end-7",
  },
  {
    name: "n",
    visible: false,
    meaning(roumaji) {
      return roumaji === this.name;
    },
    color: "transparent border-gray-100 hover:bg-gray-700/50",
    className: "row-start-2 row-end-7 items-center justify-center",
  },
];

const columns: Col[] = [
  {
    name: "",
    meaning: (roumaji) =>
      rows
        .filter((row) => row.visible !== false)
        .map((row) => row.name)
        .some((row) => row === roumaji),
    className: "col-start-11 col-end-12",
  },
  {
    name: "k",
    meaning: isFirstCharEqual,
    className: "col-start-10 col-end-11",
  },
  {
    name: "s",
    meaning: isFirstCharEqual,
    className: "col-start-9 col-end-10",
  },
  {
    name: "t",
    meaning(roumaji: string) {
      return roumaji.length === 3
        ? ["ts", "ch"].includes(roumaji.slice(0, 2))
        : isFirstCharEqual.call(this, roumaji);
    },
    className: "col-start-8 col-end-9",
  },
  {
    name: "n",
    meaning: isFirstCharEqual,
    className: "col-start-7 col-end-8",
  },
  {
    name: "h",
    meaning(roumaji: string) {
      return roumaji.length === 2 && [this.name, "f"].includes(roumaji[0]);
    },
    className: "col-start-6 col-end-7",
  },
  {
    name: "m",
    meaning: isFirstCharEqual,
    className: "col-start-5 col-end-6",
  },
  {
    name: "y",
    meaning: isFirstCharEqual,
    className: "col-start-4 col-end-5",
  },
  {
    name: "r",
    meaning: isFirstCharEqual,
    className: "col-start-3 col-end-4",
  },
  {
    name: "w",
    meaning: isFirstCharEqual,
    className: "col-start-2 col-end-3",
  },
  {
    name: "",
    meaning: (roumaji) => roumaji === "n",
    className: "col-start-1 col-end-2",
  },
];

const getCellClassNames = (abc: AlphabetCharacter) => {
  const finder = <T extends { meaning: Col["meaning"] }>(array: T[]) =>
    array.find((item) => item.meaning(abc.roumaji));

  const row = finder<Row>(rows);
  const col = finder<Col>(columns);

  if (col && row) {
    if (abc.roumaji === "n") {
      console.log(
        [col.className, row.className, row.color].filter(Boolean).join(" ")
      );
    }
    return [col.className, row.className, row.color].filter(Boolean).join(" ");
  }

  return null;
};

const Table = ({ alphabet }: IProps) => {
  return (
    <div className="grid text-white gap-4">
      {rows
        .filter((row) => row.visible !== false)
        .map((row) => (
          <div
            key={row.name}
            className={`flex items-center justify-center col-start-12 col-end-12 ${row.className}`}
          >
            <span>{row.name}</span>
          </div>
        ))}
      {alphabet.map((alphabetCharacter) => {
        const classNames = getCellClassNames(alphabetCharacter);

        if (!classNames) {
          return null;
        }

        return (
          <div
            key={alphabetCharacter.character}
            className={`flex flex-col cursor-pointer p-4 border transition-colors ${getCellClassNames(
              alphabetCharacter
            )}`}
          >
            <span className="text-2xl text-center">
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
      {columns.map((column) => (
        <div
          key={column.name}
          className={`flex items-center justify-center row-start-1 row-end-1 ${column.className}`}
        >
          <span>{column.name}</span>
        </div>
      ))}
    </div>
  );
};

export default Table;
