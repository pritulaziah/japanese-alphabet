import clsx from "clsx";
import { Answer } from "types/game";
import capitalize from "utils/capitalize";
import Button from "components/common/Button";
import Footer from "./Footer";
import CircleProgress from "components/common/CircleProgress";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightLong } from "@fortawesome/free-solid-svg-icons";
import { AlphabetForms } from "types/alphabet";

const answerValueDict: {
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
  answers: Answer[];
  finishGame: () => void;
  form: AlphabetForms;
}

const Result = ({ answers, finishGame, form }: IProps) => {
  const correctAnswers = answers.filter(
    (answer) => answer.value === "correct"
  ).length;
  const progress =
    correctAnswers === 0
      ? 0
      : Math.round((correctAnswers / answers.length) * 100);

  return (
    <>
      <div className="w-full max-w-[50%] mt-20">
        <div className="flex justify-between items-center">
          <CircleProgress progress={progress} />
          <span className="text-lg">
            <span className="font-medium text-slate-700 dark:text-slate-200">
              Счёт:
            </span>{" "}
            <span className="text-xl font-semibold">{correctAnswers}</span>
            <span> / </span>
            <span>{answers.length}</span>
          </span>
        </div>
        <ul className="list-none divide-y">
          {answers.map(({ character, value }) => {
            const { styles, text } = answerValueDict[value];

            return (
              <li key={character.romaji} className="flex py-2 justify-between">
                <div className="flex flex-col">
                  <div className="inline-flex items-center mb-1">
                    <div
                      className="font-semibold text-xl font-japanese -mb-1"
                      lang="ja"
                    >
                      {character[form]}
                    </div>
                    <span className="w-5 h-5 text-neutral-500">
                      <FontAwesomeIcon icon={faRightLong} />
                    </span>
                    <div className="text-xl">{`${character.romaji} (${character.ru})`}</div>
                  </div>
                  <div className="text-neutral-500 dark:text-neutral-400">
                    {capitalize(character.type)}
                  </div>
                </div>
                <div className="flex items-center">
                  <span className={clsx(styles.text)}>{text}</span>
                  <div
                    className={clsx(
                      "ml-1.5 h-full w-1.5 rounded-lg",
                      styles.bg
                    )}
                  />
                </div>
              </li>
            );
          })}
        </ul>
      </div>
      <Footer>
        <Button onClick={finishGame}>Завершить</Button>
      </Footer>
    </>
  );
};

export default Result;
