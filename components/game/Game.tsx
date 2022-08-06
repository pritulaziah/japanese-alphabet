import { useState } from "react";
import { Answer } from "types/game";
import Button from "components/common/Button";
import GuessCharacter from "./GuessCharacter";
import ResultGame from "./ResultList";

const Game = () => {
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [startedGame, setStartedGame] = useState(false);
  const endGame = answers.length === 6;

  const onAnswer = ({ character, value, correct }: Answer) => {
    setAnswers([...answers, { character, value, correct }]);
  };

  const startGame = () => {
    setStartedGame(true);
  };

  let game = null;

  if (endGame) {
    game = <ResultGame answers={answers} />;
  } else if (startedGame) {
    game = <GuessCharacter onAnswer={onAnswer} />;
  } else {
    game = <Button onClick={startGame}>Start game</Button>;
  }

  return (
    <div className="flex flex-col justify-center items-center flex-1">
      {game}
    </div>
  );
};

export default Game;
