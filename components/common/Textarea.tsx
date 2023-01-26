import React from "react";
import clsx from "clsx";

interface IProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, IProps>(
  ({ error, ...restProps }, ref) => {
    return (
      <textarea
        {...restProps}
        ref={ref}
        className={clsx(
          error
            ? "bg-red-50 border-red-500 text-red-900 dark:bg-gray-700 focus:border-red-500 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500 placeholder-red-700 focus:ring-red-500"
            : "text-gray-900 bg-gray-50 border-gray-300 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500",
          "block p-2.5 w-full text-sm rounded-lg border outline-none focus:ring-1"
        )}
      />
    );
  }
);

Textarea.displayName = "Textarea";

export default Textarea;
