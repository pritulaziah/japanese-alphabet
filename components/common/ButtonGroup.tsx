import clsx from "clsx";

interface IProps<T> {
  collection: T[];
  current: T;
  onChange: (item: T) => void;
}

const ButtonGroup = <T extends string | number>({
  collection,
  current,
  onChange,
}: IProps<T>) => {
  return (
    <div className="inline-flex rounded-md shadow-sm" role="group">
      {collection.map((item, index, array) => (
        <button
          key={item}
          type="button"
          className={clsx(
            "py-2 px-4 text-sm font-medium -ml-[1px] border border-gray-200 dark:border-gray-600",
            index === 0 && "rounded-l-lg",
            index === array.length - 1 && "rounded-r-md",
            current === item
              ? "bg-blue-700 text-white dark:bg-blue-500"
              : "dark:bg-gray-700 bg-white text-gray-900 dark:text-white hover:bg-gray-100 hover:text-blue-700 dark:hover:text-white dark:hover:bg-gray-600"
          )}
          onClick={() => onChange(item)}
        >
          {item}
        </button>
      ))}
    </div>
  );
};

export default ButtonGroup;
