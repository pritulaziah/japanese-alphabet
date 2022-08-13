import { useState } from "react";
import { Answer } from "types/game";
import Result from "./Result";
import GuessCharacter from "./GuessCharacter";
import Start from "./Start";

const Game = () => {
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [isStart, setIsStart] = useState(false);
  const [questionCount, setQuestionCount] = useState(20);

  const onAnswer = ({ character, value, userInput }: Answer) => {
    setAnswers([...answers, { character, value, userInput }]);
  };

  const changeQuestionCount = (count: number) => {
    setQuestionCount(count);
  };

  const finishGame = () => {
    setIsStart(false);
    setAnswers([]);
  };

  const startGame = () => {
    setIsStart(true);
  };

  let component = null;

  if (answers.length === questionCount) {
    component = <Result answers={answers} finishGame={finishGame} />;
  } else if (isStart) {
    component = <GuessCharacter onAnswer={onAnswer} />;
  } else {
    component = (
      <Start
        startGame={startGame}
        currentQuestionCount={questionCount}
        changeQuestionCount={changeQuestionCount}
      />
    );
  }

  return (
    <div className="flex flex-col flex-1 justify-center items-center px-4">
      {component}
    </div>
  );
};

export default Game;
