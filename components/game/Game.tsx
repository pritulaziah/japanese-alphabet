import { useState } from "react";
import { Answer } from "types/game";
import ResultList from "components/game/ResultList";
import GuessCharacter from "./GuessCharacter";
import Welcome from "./Welcome";

const Game = () => {
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [isStart, setIsStart] = useState(false);

  const onAnswer = ({ character, value, userInput }: Answer) => {
    setAnswers([...answers, { character, value, userInput }]);
  };

  const finishGame = () => {
    setIsStart(false);
    setAnswers([]);
  };

  const startGame = () => {
    setIsStart(true);
  };

  let component = null;

  if (answers.length === 30) {
    component = <ResultList answers={answers} finishGame={finishGame} />;
  } else if (isStart) {
    component = <GuessCharacter onAnswer={onAnswer} />;
  } else {
    component = <Welcome startGame={startGame} />;
  }

  return (
    <div className="flex flex-col flex-1 justify-center items-center px-4">
      {component}
    </div>
  );
};

export default Game;
