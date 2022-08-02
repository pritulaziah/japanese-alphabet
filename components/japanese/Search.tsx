import React, { useState } from "react";
import clsx from "clsx";

interface IProps {
  value: string;
  onChange: (value: string) => void;
}

const Search = ({ value, onChange }: IProps) => {
  const [isFocused, setFocused] = useState(false);

  const onFocus = (event: React.FocusEvent<HTMLInputElement, Element>) => {
    setFocused(true);
  };
  const onBlur = (event: React.FocusEvent<HTMLInputElement, Element>) => {
    setFocused(false);
  };

  return (
    <div className="relative inline-block mb-4">
      <span className="absolute inset-y-0 left-0 flex items-center pl-2">
        <span
          className={clsx(
            "flex w-5 h-5 text-gray-400 transition-colors",
            isFocused && "text-gray-300"
          )}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
          </svg>
        </span>
      </span>
      <input
        className={clsx(
          "w-64 bg-gray-700 placeholder:text-gray-400 border-2 border-transparent outline-none block py-2 pl-9 pr-3 text-sm rounded-lg transition-all",
          isFocused && "border-blue-400 w-80"
        )}
        type="text"
        onChange={(event) => onChange(event.target.value)}
        placeholder="Поиск"
        value={value}
        onFocus={onFocus}
        onBlur={onBlur}
      />
    </div>
  );
};

export default Search;
