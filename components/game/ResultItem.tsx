import clsx from "clsx";
import { Answer } from "types/game";
import capitalize from "utils/capitalize";

const anserValues: {
  [key in Answer["value"]]: {
    text: string;
    styles: { text: string; bg: string };
  };
} = {
  correct: {
    text: "Правильно",
    styles: {
      text: "text-green-600 dark:text-green-500",
      bg: "bg-green-600 dark:bg-green-500",
    },
  },
  incorrect: {
    text: "Неправильно",
    styles: {
      text: "text-red-600 dark:text-red-500",
      bg: "bg-red-600 dark:bg-red-500",
    },
  },
  skip: {
    text: "Пропуск",
    styles: {
      text: "text-yellow-600 dark:text-yellow-500",
      bg: "bg-yellow-600 dark:bg-yellow-500",
    },
  },
};

interface IProps {
  answer: Answer;
}

const ResultItem = ({ answer }: IProps) => {
  const answerValue = anserValues[answer.value];

  return (
    <li className="flex py-2 justify-between">
      <div className="flex flex-col">
        <div className="inline-flex items-center mb-1">
          <div className="font-semibold text-xl font-japanese" lang="ja">
            {answer.character.hiragana.character}
          </div>
          <span className="w-5 h-5 -mb-1 text-neutral-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M16.01 11H4v2h12.01v3L20 12l-3.99-4z" />
            </svg>
          </span>
          <div className="text-xl">{`${answer.character.romaji} (${answer.character.ru})`}</div>
        </div>
        <div className="text-neutral-500 dark:text-neutral-400">
          {capitalize(answer.character.type)}
        </div>
      </div>
      <div className="flex items-center">
        <span className={clsx(answerValue.styles.text)}>
          {answerValue.text}
        </span>
        <div
          className={clsx(
            "ml-1.5 h-full w-1.5 rounded-lg",
            answerValue.styles.bg
          )}
        />
      </div>
    </li>
  );
};

export default ResultItem;
