import { useState } from "react";

interface IProps {}

const Search = (props: IProps) => {
  const [searchValue, setSearchValue] = useState("");

  return (
    <div className="relative inline-block mb-4">
      <span className="absolute inset-y-0 left-0 flex items-center pl-2">
        <svg
          aria-hidden="true"
          className="w-5 h-5 text-gray-500 dark:text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          ></path>
        </svg>
      </span>
      <input
        className="w-64 bg-gray-700 placeholder:text-gray-400 text-white border border-gray-600 outline-none block py-2 pl-9 pr-3 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 focus:w-72 transition-all"
        type="text"
        onChange={(event) => setSearchValue(event.target.value)}
        placeholder="Поиск"
        value={searchValue}
      />
    </div>
  );
};

export default Search;
