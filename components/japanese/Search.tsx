import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
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
        <FontAwesomeIcon
          icon={faSearch}
          className={clsx(
            "text-gray-400 transition-colors",
            isFocused && "text-gray-300"
          )}
        />
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
