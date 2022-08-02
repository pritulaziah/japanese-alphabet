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
            "w-4 text-gray-400 transition-colors",
            isFocused && "text-gray-300"
          )}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
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
