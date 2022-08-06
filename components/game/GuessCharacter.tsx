import { useState } from "react";
import Button from "components/common/Button";
import Input from "components/common/Input";
import { AlphabetCharacter } from "types/alphabet";
import { Answer } from "types/game";
import kana from "kana.json";

const randomCharacter = (): AlphabetCharacter => {
  return (kana as unknown as AlphabetCharacter[])[
    Math.floor(Math.random() * kana.length)
  ];
};

interface IProps {
  onAnswer: (answer: Answer) => void;
}

const GuessCharacter = ({ onAnswer }: IProps) => {
  const [inputValue, setInputValue] = useState("");
  const [playedChars, setPlayedChars] = useState<Set<string>>(
    new Set<string>()
  );
  const [currentCharacter, setCurrentCharacter] = useState<AlphabetCharacter>(
    () => randomCharacter()
  );

  const onChangeInputValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const nextChar = () => {
    const newPlayedChars = new Set([...playedChars, currentCharacter.romaji]);
    let nextChar = randomCharacter();

    while (newPlayedChars.has(nextChar.romaji)) {
      nextChar = randomCharacter();
    }

    setPlayedChars(newPlayedChars);
    setCurrentCharacter(nextChar);
  };

  const checkAnswer = () => {
    nextChar();
    onAnswer({
      character: currentCharacter,
      value:
        currentCharacter.romaji === inputValue.trim().toLocaleLowerCase()
          ? "correct"
          : "incorrect",
      userInput: inputValue,
    });
    setInputValue("");
  };

  const skipAnswer = () => {
    nextChar();
    onAnswer({ userInput: "", character: currentCharacter, value: "skip" });
  };

  return (
    <>
      <div className="text-9xl font-japanese mb-8">
        {currentCharacter.hiragana.character}
      </div>
      <div className="mb-4">
        <Input
          value={inputValue}
          onChange={onChangeInputValue}
          placeholder="Ваш ответ"
        />
      </div>
      <div className="flex space-x-2">
        <Button color="alternative" onClick={skipAnswer}>
          Пропустить
        </Button>
        <Button fullWidth onClick={checkAnswer}>
          Проверить
        </Button>
      </div>
    </>
  );
};

export default GuessCharacter;
