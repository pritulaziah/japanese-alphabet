import React from "react";
import Input, { IInputProps } from "components/common/Input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

interface IProps extends Omit<IInputProps, "onChange"> {
  value: string;
  onChange: (value: string) => void;
}

const Search = ({ value, onChange, ...restProps }: IProps) => {
  return (
    <div className="relative inline-block">
      <span className="absolute inset-y-0 left-0 flex items-center pl-2">
        <span className="flex w-5 h-5 text-gray-500 dark:text-gray-400">
          <FontAwesomeIcon icon={faSearch} />
        </span>
      </span>
      <Input
        {...restProps}
        className="w-full lg:w-64 py-2 pl-9 pr-3"
        onChange={(event) => onChange(event.target.value)}
        placeholder="Search"
        value={value}
      />
    </div>
  );
};

export default Search;
