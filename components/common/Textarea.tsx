import React from "react";

export type ITextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

const Textarea = React.forwardRef<HTMLTextAreaElement, ITextareaProps>(
  (props, ref) => {
    return (
      <textarea
        {...props}
        ref={ref}
        rows={4}
        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500 outline-none focus:ring-1"
      />
    );
  }
);

export default Textarea;
