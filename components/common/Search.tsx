import React from "react";
import Input from "components/common/Input";

interface IProps {
  value: string;
  onChange: (value: string) => void;
}

const Search = ({ value, onChange }: IProps) => {
  return (
    <div className="relative inline-block mb-4">
      <span className="absolute inset-y-0 left-0 flex items-center pl-2">
        <span className="flex w-5 h-5 text-gray-500 dark:text-gray-400">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
          </svg>
        </span>
      </span>
      <Input
        className="w-full lg:w-64 py-2 pl-9 pr-3"
        onChange={(event) => onChange(event.target.value)}
        placeholder="Поиск"
        value={value}
      />
    </div>
  );
};

export default Search;
