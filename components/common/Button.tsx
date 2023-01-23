import clsx from "clsx";
import React, { ButtonHTMLAttributes } from "react";

type Variant = "filled" | "outline";
type Size = "md" | "lg";
type Color = "default" | "red" | "alternative";

const sizes: { [key in Size]: string } = {
  md: "text-sm px-5 py-2.5",
  lg: "text-base py-3 px-5",
};

const variants: {
  [key in Variant]: { [key in Color]: string };
} = {
  filled: {
    default:
      "text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800",
    red: "text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900",
    alternative:
      "text-gray-900 bg-white border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700",
  },
  outline: {
    default:
      "text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-600 dark:focus:ring-blue-800",
    alternative: "",
    red: "text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900",
  },
};

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: Size;
  color?: Color;
  variant?: Variant;
  rounded?: boolean;
  children: React.ReactNode;
  fullWidth?: boolean;
}

const Button = ({
  size = "md",
  variant = "filled",
  color = "default",
  rounded = false,
  fullWidth = false,
  disabled = false,
  className,
  children,
  ...restProps
}: IProps) => {
  const styles = variants[variant][color];

  return (
    <button
      {...restProps}
      type="button"
      className={clsx(
        "focus:outline-none flex items-center justify-center font-medium transition duration-150 ease-in-out",
        sizes[size],
        styles,
        disabled && "opacity-50 cursor-not-allowed pointer-events-none",
        rounded ? "rounded-full" : "rounded-lg",
        fullWidth ? "w-full" : "w-auto",
        className
      )}
    >
      {children}
    </button>
  );
};

export default Button;
