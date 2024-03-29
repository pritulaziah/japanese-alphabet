import React from "react";

export interface IColumn<TData> {
  id?: string;
  accessor?: keyof TData;
  header: React.ReactNode;
  render?: (data: TData) => React.ReactNode;
  width?: string;
}

interface IProps<T> {
  data: T[];
  columns: IColumn<T>[];
}

function Table<TData extends { _id: number | string }>({
  data,
  columns,
}: IProps<TData>) {
  return (
    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          {columns.map((column) => (
            <th
              key={(column.accessor as React.Key) ?? column.id}
              style={{ width: column.width }}
              className="py-3 px-6"
            >
              {column.header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.length > 0 ? (
          data.map((row) => (
            <tr
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              key={row._id}
            >
              {columns.map((cell) => (
                <td
                  className="py-4 px-6"
                  style={{ width: cell.width }}
                  key={(cell.accessor as React.Key) ?? cell.id}
                >
                  <>
                    {cell.render?.(row) ||
                      (cell.accessor ? row[cell.accessor] : null)}
                  </>
                </td>
              ))}
            </tr>
          ))
        ) : (
          <tr className="bg-white">
            <td colSpan={columns.length}>
              <div className="text-sm text-slate-500 text-center w-full py-4 opacity-75 dark:text-slate-300">
                No data
              </div>
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}

export default Table;
