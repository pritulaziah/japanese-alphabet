import { useMemo, useState } from "react";
import Button from "components/common/Button";
import Input from "components/common/Input";
import useStore from "hooks/useStore";
import { AlphabetCharacter } from "types/alphabet";
import { Answer } from "types/game";
import Footer from "./Footer";
import kana from "kana.json";

const randomCharacter = (alphabet: AlphabetCharacter[]) => {
  return alphabet[Math.floor(Math.random() * alphabet.length)];
};

interface IProps {
  onAnswer: (answer: Answer) => void;
}

const GuessCharacter = ({ onAnswer }: IProps) => {
  const { state } = useStore();
  const currentAlphabet = useMemo(
    () =>
      (kana as unknown as AlphabetCharacter[]).filter((item) =>
        state.visibleTypes.includes(item.type)
      ),
    [state.visibleTypes]
  );
  const [inputValue, setInputValue] = useState("");
  const [playedChars, setPlayedChars] = useState<Set<string>>(
    new Set<string>()
  );

  const [currentCharacter, setCurrentCharacter] = useState<AlphabetCharacter>(
    () => randomCharacter(currentAlphabet)
  );

  const onChangeInputValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const nextChar = () => {
    const newPlayedChars = new Set([...playedChars, currentCharacter.romaji]);
    let nextChar = randomCharacter(currentAlphabet);

    while (newPlayedChars.has(nextChar.romaji)) {
      nextChar = randomCharacter(currentAlphabet);
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
    setInputValue("");
  };

  return (
    <>
      <div className="text-9xl font-japanese mb-8">
        {currentCharacter.hiragana.character}
      </div>
      <div className="min-w-[30%]">
        <Input
          value={inputValue}
          onChange={onChangeInputValue}
          placeholder="Ваш ответ"
        />
      </div>
      <Footer>
        <Button color="alternative" onClick={skipAnswer}>
          Пропустить
        </Button>
        <Button className="w-40" onClick={checkAnswer}>
          Проверить
        </Button>
      </Footer>
    </>
  );
};

export default GuessCharacter;
