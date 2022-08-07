import { useState } from "react";
import { Answer } from "types/game";
import GuessCharacter from "components/game/GuessCharacter";
import ResultList from "components/game/ResultList";
import Button from "components/common/Button";

const Game = () => {
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [isStart, setIsStart] = useState(false);
  const endGame = answers.length === 6;

  const onAnswer = ({ character, value, userInput }: Answer) => {
    setAnswers([...answers, { character, value, userInput }]);
  };

  const startGame = () => {
    setIsStart(true);
  };

  let main = null;
  let footer = null;

  if (endGame) {
    main = <ResultList answers={answers} />;
  } else if (isStart) {
    main = <GuessCharacter onAnswer={onAnswer} />;
  } else {
    main = <div>Добро пожаловать в игру!</div>;
    footer = (
      <>
        <Button size="lg" rounded onClick={startGame}>
          Начать игру
        </Button>
      </>
    );
  }

  return (
    <div className="flex flex-col flex-1">
      <div className="flex-1 flex justify-center items-center">{main}</div>
      <div className="sticky bottom-0 left-0 flex justify-center mb-6 px-1">
        {footer}
      </div>
    </div>
  );
};

export default Game;
