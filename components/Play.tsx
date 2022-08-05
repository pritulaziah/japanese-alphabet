import Button from "components/common/Button";
import Input from "components/common/Input";
import React, { useState } from "react";
import kana from "kana.json";
import { AlphabetCharacter } from "types/alphabet";
import Modal from "./common/Modal/Modal";
import ModalBody from "./common/Modal/ModalBody";
import ModalHeader from "./common/Modal/ModalHeader";
import clsx from "clsx";

const MAX_ANSWERS = 30;

interface IProps {
  finishGame: () => void;
}

type Answer = {
  char: AlphabetCharacter;
  correct: boolean;
  userInput: string;
};

const randomCharacter = (): AlphabetCharacter => {
  return (kana as AlphabetCharacter[])[Math.floor(Math.random() * kana.length)];
};

const getTotalRightAnswer = (answers: Answer[]) =>
  answers.filter((answer) => answer.correct).length;

const Play = ({ finishGame }: IProps) => {
  const [currentChar, setCurrentChar] = useState<AlphabetCharacter>(() =>
    randomCharacter()
  );
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [showResult, setShowResult] = useState(false);

  const onChangeChar = (
    correct: Answer["correct"],
    userInput: Answer["userInput"]
  ) => {
    let nextChar = randomCharacter();
    const playedChars = answers.map((answer) => answer.char.romaji);

    while (playedChars.includes(nextChar.romaji)) {
      nextChar = randomCharacter();
    }

    setCurrentChar(nextChar);
    const newAnsers = [...answers, { char: currentChar, correct, userInput }];
    setAnswers(newAnsers);

    if (newAnsers.length >= MAX_ANSWERS) {
      setShowResult(true);
    }
  };

  const checkAnswer = () => {
    const correctAnswer =
      currentChar.romaji === inputValue.trim().toLocaleLowerCase();

    onChangeChar(correctAnswer, inputValue);
    setInputValue("");
  };

  const onChangeInputValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  return (
    <>
      <div className="text-9xl font-japanese mb-8">
        {currentChar.hiragana.character}
      </div>
      <div className="mb-4">
        <Input
          value={inputValue}
          onChange={onChangeInputValue}
          placeholder="Ваш ответ"
        />
      </div>
      <div className="flex space-x-2">
        <Button
          variant="outlined"
          onClick={() => onChangeChar(false, "Пропуск")}
        >
          Пропустить
        </Button>
        <Button fullWidth onClick={checkAnswer}>
          Проверить
        </Button>
      </div>
      <Modal show={showResult} onHide={finishGame}>
        <ModalHeader>
          <div className="inline-block">
            <span>Счёт: </span>
            <span>{getTotalRightAnswer(answers)}</span>
            <span> / </span>
            <span>{answers.length}</span>
          </div>
        </ModalHeader>
        <ModalBody>
          <ul className="list-none divide-y">
            {answers.map((answer) => (
              <li key={answer.char.romaji}>
                <div className="flex py-2 justify-between">
                  <div className="flex flex-col">
                    <div className="inline-flex items-center">
                      <div
                        className="font-semibold text-xl font-japanese"
                        lang="ja"
                      >
                        {answer.char.hiragana.character}
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
                      <div className="text-xl">{answer.char.romaji}</div>
                    </div>
                    <div>
                      <span className="text-neutral-500 dark:text-neutral-400">
                        Ваш ответ:
                      </span>{" "}
                      <span className="text-neutral-900 dark:text-neutral-200">
                        {answer.userInput}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <span
                      className={clsx(
                        answer.correct ? "text-green-600" : "text-red-600"
                      )}
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
            ))}
          </ul>
        </ModalBody>
      </Modal>
    </>
  );
};

export default Play;
