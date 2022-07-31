import { Alphabet } from "types/alphabet";

interface IProps {
  data: Alphabet[];
}

const cols = [
  "col-start-1",
  "col-start-2",
  "col-start-3",
  "col-start-4",
  "col-start-5",
  "col-start-6",
  "col-start-7",
  "col-start-8",
  "col-start-9",
  "col-start-10",
  "col-start-11",
];

const getRowClass = (row?: number) => {
  const rows = [
    "row-start-1",
    "row-start-2",
    "row-start-3",
    "row-start-4",
    "row-start-5",
  ];

  return row ? rows[row - 1] : `${rows[0]} ${rows[rows.length - 1]}`;
};

const getColorFromRoumaji = (roumaji: string) => {
  const colors: { [key: string]: string } = {
    a: "bg-blue-300/25 border-blue-300 hover:bg-blue-300/50",
    i: "bg-orange-300/25 border-orange-300 hover:bg-orange-300/50",
    u: "bg-purple-300/25 border-purple-300 hover:bg-purple-300/50",
    e: "bg-emerald-300/25 border-emerald-300 hover:bg-emerald-300/50",
    o: "bg-red-300/25 border-red-300 hover:bg-red-300/50",
  };

  const founded = Object.keys(colors).find((key) => roumaji.includes(key));

  return founded
    ? colors[founded]
    : "bg-gray-700/25 border-gray-100 hover:bg-gray-700/50";
};

const Table = ({ data }: IProps) => {
  return (
    <div className="grid grid-rows-5 grid-cols-11 text-white gap-4">
      {data.map(({ character, ru, roumaji, column, row }) => (
        <div
          key={character}
          className={`flex flex-col ${cols[column - 1]} ${getRowClass(
            row
          )} cursor-pointer p-4 border ${getColorFromRoumaji(
            roumaji
          )} transition-colors`}
        >
          <span className="text-2xl text-center">{character}</span>
          <span className="text-base text-gray-400">{ru}</span>
          <span className="text-base text-gray-400">{roumaji}</span>
        </div>
      ))}
    </div>
  );
};

export default Table;
