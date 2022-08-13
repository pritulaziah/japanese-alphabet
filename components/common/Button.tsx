import clsx from "clsx";
import React, { ButtonHTMLAttributes } from "react";

type Variant = "filled";
type Size = "md" | "lg";
type Color = "default" | "alternative";

const sizes: { [key in Size]: string } = {
  md: "text-sm px-5 py-2.5",
  lg: "text-base py-3 px-5",
};

const variants: {
  [key in Variant]: { [key in Color]: { disabled: string; base: string } };
} = {
  filled: {
    default: {
      base: "text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800",
      disabled: "text-white bg-blue-400 dark:bg-blue-400 cursor-not-allowed",
    },
    alternative: {
      base: "text-gray-900 bg-white border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700",
      disabled: "",
    },
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
  const styles = variants[variant][color][disabled ? "disabled" : "base"];

  return (
    <button
      {...restProps}
      type="button"
      className={clsx(
        "focus:outline-none flex items-center justify-center font-medium transition duration-150 ease-in-out",
        sizes[size],
        styles,
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
