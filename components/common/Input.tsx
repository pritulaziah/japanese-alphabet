import clsx from "clsx";
import React from "react";

type Size = "md" | "lg";

export interface IInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  size?: Size;
  error?: boolean;
}

const sizes: { [key in Size]: string } = {
  md: "p-2.5 text-sm",
  lg: "p-3.5 text-md",
};

const Input = React.forwardRef<HTMLInputElement, IInputProps>(
  ({ error, type = "text", size = "md", id, className, ...restProps }, ref) => {
    return (
      <input
        {...restProps}
        type={type}
        ref={ref}
        id={id}
        className={clsx(
          error
            ? "bg-red-50 border-red-500 text-red-900 dark:bg-gray-700 focus:border-red-500 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500 placeholder-red-700 focus:ring-red-500"
            : "bg-gray-50 border-gray-300 text-gray-900 dark:bg-gray-700 focus:border-blue-500 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500",
          "rounded-lg block w-full border focus:ring-1 focus:ring-blue-500 dark:focus:ring-blue-500 outline-none",
          sizes[size],
          className
        )}
      />
    );
  }
);

Input.displayName = "Input";

export default Input;
