import React from "react";
import clsx from "clsx";

type Size = "md" | "lg";
interface IProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
  size?: Size;
}

const sizes: { [key in Size]: string } = {
  md: "p-2.5 text-sm",
  lg: "p-3.5 text-md",
};

const Textarea = React.forwardRef<HTMLTextAreaElement, IProps>(
  ({ error, size = "md", ...restProps }, ref) => {
    return (
      <textarea
        {...restProps}
        ref={ref}
        className={clsx(
          error
            ? "bg-red-50 border-red-500 text-red-900 dark:bg-gray-700 focus:border-red-500 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500 placeholder-red-700 focus:ring-red-500"
            : "text-gray-900 bg-gray-50 border-gray-300 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500",
          "block w-full rounded-lg border outline-none focus:ring-1",
          sizes[size]
        )}
      />
    );
  }
);

Textarea.displayName = "Textarea";

export default Textarea;
