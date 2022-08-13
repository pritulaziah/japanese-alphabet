import clsx from "clsx";

const questionCounts = [10, 15, 20, 25, 30];

const QuestionCounter = () => {
  return (
    <div className="flex flex-col">
      <div className="mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
        Количество вопросов:
      </div>
      <div className="inline-flex rounded-md shadow-sm" role="group">
        {questionCounts.map((questionCount, index, array) => (
          <button
            key={questionCount}
            type="button"
            className={clsx(
              "py-2 px-4 text-sm font-medium text-gray-900 -ml-[1px] bg-white border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white",
              index === 0 && "rounded-l-lg",
              index === array.length - 1 && "rounded-r-md"
            )}
          >
            {questionCount}
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuestionCounter;
