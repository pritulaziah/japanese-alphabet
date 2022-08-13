import clsx from "clsx";
import React, { InputHTMLAttributes } from "react";

interface IProps extends InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, IProps>(
  ({ type = "text", id, className, ...restProps }, ref) => {
    return (
      <input
        {...restProps}
        type={type}
        ref={ref}
        id={id}
        className={clsx(
          "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",
          className
        )}
      />
    );
  }
);

Input.displayName = "Input";

export default Input;
