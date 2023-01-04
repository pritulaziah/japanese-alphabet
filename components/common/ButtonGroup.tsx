import clsx from "clsx";

interface Option<T> {
  value: T;
  label: string;
}

interface IProps<T> {
  collection: Option<T>[];
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
          key={item.value}
          type="button"
          className={clsx(
            "py-2 px-4 text-sm font-medium -ml-[1px] border border-gray-200 dark:border-gray-600",
            index === 0 && "rounded-l-lg",
            index === array.length - 1 && "rounded-r-md",
            current === item.value
              ? "bg-blue-700 text-white dark:bg-blue-500"
              : "dark:bg-gray-700 bg-white text-gray-900 dark:text-white hover:bg-gray-100 hover:text-blue-700 dark:hover:text-white dark:hover:bg-gray-600"
          )}
          onClick={() => onChange(item.value)}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
};

export default ButtonGroup;
