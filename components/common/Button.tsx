import clsx from "clsx";
import React, { ButtonHTMLAttributes } from "react";

type Variant = "filled" | "outlined";
type Size = "md" | "lg";

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: Size;
  variant?: Variant;
  rounded?: boolean;
  children: React.ReactNode;
  fullWidth?: boolean;
}

const sizes: { [key in Size]: string } = {
  md: "text-sm px-5 py-2.5",
  lg: "text-base py-3 px-5",
};

const variants: { [key in Variant]: string } = {
  filled:
    "text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800",
  outlined:
    "text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-600 dark:focus:ring-blue-800",
};

const Button = ({
  size = "md",
  variant = "filled",
  rounded = false,
  fullWidth = false,
  children,
  ...restProps
}: IProps) => {
  return (
    <button
      {...restProps}
      type="button"
      className={clsx(
        "focus:outline-none flex items-center justify-center font-medium transition duration-150 ease-in-out",
        sizes[size],
        variants[variant],
        rounded ? "rounded-full" : "rounded-lg",
        fullWidth ? "w-full" : "w-auto"
      )}
    >
      {children}
    </button>
  );
};

export default Button;
