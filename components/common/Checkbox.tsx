import clsx from "clsx";
import React, { InputHTMLAttributes } from "react";

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
  children: React.ReactNode;
}

const CheckBoxOutlineBlank = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z" />
  </svg>
);

const CheckBoxIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
  </svg>
);

const Checkbox = ({ children, checked, onChange }: IProps) => {
  return (
    <label className="flex items-center cursor-pointer py-1">
      <input
        className="absolute top-0 left-0 opacity-0 pointer-events-none w-0 h-0"
        checked={checked}
        type="checkbox"
        onChange={onChange}
      />
      <span
        className={clsx(
          "flex w-6 h-6 rounded transition-colors",
          checked ? "text-blue-600" : "text-gray-300 dark:text-gray-600"
        )}
      >
        {checked ? CheckBoxIcon : CheckBoxOutlineBlank}
      </span>
      <span className="ml-2 font-medium text-gray-900 dark:text-gray-300">
        {children}
      </span>
    </label>
  );
};

export default Checkbox;
