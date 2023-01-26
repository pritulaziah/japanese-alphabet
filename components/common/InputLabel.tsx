import clsx from "clsx";

interface IProps extends React.HTMLAttributes<HTMLLabelElement> {
  error?: boolean;
}

const InputLabel = ({ children, error, ...restProps }: IProps) => {
  return (
    <label
      {...restProps}
      className={clsx(
        "block mb-2 text-sm font-medium",
        error
          ? "text-red-700 dark:text-red-500"
          : "text-gray-900 dark:text-white"
      )}
    >
      {children}
    </label>
  );
};

export default InputLabel;
