import clsx from "clsx";

interface IProps {
  children: React.ReactNode;
  className?: string;
  active?: boolean;
}

const PaginationButton = ({ children, className, active = false }: IProps) => {
  return (
    <button
      className={clsx(
        className,
        "relative inline-flex items-center px-4 py-2 text-sm font-medium border",
        active
          ? "text-blue-600 border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white z-10"
          : "text-gray-500 border-gray-300 bg-white hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
      )}
    >
      {children}
    </button>
  );
};

export default PaginationButton;
