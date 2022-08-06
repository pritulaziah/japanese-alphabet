import clsx from "clsx";
import { Answer } from "types/game";

interface IProps {
  answer: Answer;
}

const ResultItem = ({ answer }: IProps) => {
  return (
    <li key={answer.character.romaji}>
      <div className="flex py-2 justify-between">
        <div className="flex flex-col">
          <div className="inline-flex items-center">
            <div className="font-semibold text-xl font-japanese" lang="ja">
              {answer.character.hiragana.character}
            </div>
            <span className="w-5 h-5 -mb-1 text-neutral-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M0 0h24v24H0z" fill="none" />
                <path d="M16.01 11H4v2h12.01v3L20 12l-3.99-4z" />
              </svg>
            </span>
            <div className="text-xl">{answer.character.romaji}</div>
          </div>
          <div>
            <span className="text-neutral-500 dark:text-neutral-400">
              Ваш ответ:
            </span>{" "}
            <span className="text-neutral-900 dark:text-neutral-200">
              {answer.value}
            </span>
          </div>
        </div>
        <div className="flex items-center">
          <span
            className={clsx(answer.correct ? "text-green-600" : "text-red-600")}
          >
            {answer.correct ? "Верно" : "Неверно"}
          </span>
          <div
            className={clsx(
              "ml-1.5 h-full w-1.5 rounded-lg bg-black",
              answer.correct ? "bg-green-600" : "bg-red-600"
            )}
          />
        </div>
      </div>
    </li>
  );
};

export default ResultItem;
