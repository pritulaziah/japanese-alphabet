import Button from "components/common/Button";
import AlphabetTypeList from "components/common/AlphabetTypeList";
import useStore from "hooks/useStore";
import { AlphabetTypes } from "types/alphabet";
import Footer from "./Footer";
import clsx from "clsx";

const questionCounts = [10, 15, 20, 25, 30];

interface IProps {
  startGame: () => void;
  currentQuestionCount: number;
  changeQuestionCount: (count: number) => void;
}

const Start = ({
  startGame,
  currentQuestionCount,
  changeQuestionCount,
}: IProps) => {
  const { state } = useStore();
  const disabled = state.visibleTypes.length === 0;

  return (
    <>
      <div className="flex flex-col mb-2">
        <h3 className="font-medium text-lg mb-4">Настройки</h3>
        <div className="mb-5">
          <AlphabetTypeList mode="checkbox" hidden={[AlphabetTypes.Sokuon]} />
        </div>
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
                  "py-2 px-4 text-sm font-medium -ml-[1px] border border-gray-200 dark:border-gray-600",
                  index === 0 && "rounded-l-lg",
                  index === array.length - 1 && "rounded-r-md",
                  currentQuestionCount === questionCount
                    ? "bg-blue-700 text-white dark:bg-blue-500"
                    : "dark:bg-gray-700 bg-white text-gray-900 dark:text-white hover:bg-gray-100 hover:text-blue-700 dark:hover:text-white dark:hover:bg-gray-600"
                )}
                onClick={() => changeQuestionCount(questionCount)}
              >
                {questionCount}
              </button>
            ))}
          </div>
        </div>
      </div>
      <Footer>
        <Button
          size="lg"
          rounded
          onClick={disabled ? undefined : startGame}
          disabled={disabled}
        >
          Начать игру
        </Button>
      </Footer>
    </>
  );
};

export default Start;
