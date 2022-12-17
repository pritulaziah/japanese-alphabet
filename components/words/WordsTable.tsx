import { IWord } from "types/word";

interface IColumn<TData> {
  id?: React.Key;
  accessor: keyof TData;
  header: React.ReactNode;
  cell: (data: TData) => React.ReactNode;
  width: string;
}

const columns: IColumn<IWord>[] = [
  {
    accessor: "japanese",
    header: "Japanese",
    cell: (data) => (
      <span className="japanese text-lg font-medium text-gray-900 whitespace-nowrap dark:text-white">
        {data["japanese"]}
      </span>
    ),
    width: "40%",
  },
  {
    accessor: "meaning",
    header: "Meaning",
    cell: (data) => data["meaning"],
    width: "60%",
  },
];

interface IProps {
  data: IWord[];
}

const WordsTable = ({ data }: IProps) => {
  return (
    <div className="p-4">
      <table className="w-full text-sm text-left text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            {columns.map((column) => (
              <th
                key={column.id ?? column.accessor}
                style={{ width: column.width }}
                className="py-3 px-6"
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              key={row._id}
            >
              {columns.map((cell) => (
                <td
                  className="py-4 px-6"
                  style={{ width: cell.width }}
                  key={cell.id}
                >
                  {cell.cell(row)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default WordsTable;
