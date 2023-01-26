import clsx from "clsx";
import React from "react";

export type IInputProps = React.InputHTMLAttributes<HTMLInputElement>;

const Input = React.forwardRef<HTMLInputElement, IInputProps>(
  ({ type = "text", id, className, ...restProps }, ref) => {
    return (
      <input
        {...restProps}
        type={type}
        ref={ref}
        id={id}
        className={clsx(
          [
            "rounded-lg block w-full p-2.5 border text-sm focus:ring-1 focus:ring-blue-500 dark:focus:ring-blue-500 outline-none",
            "bg-gray-50 border-gray-300 text-gray-900 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500",
          ],
          className
        )}
      />
    );
  }
);

Input.displayName = "Input";

export default Input;
