import { useMemo, useState, useEffect, useRef } from "react";
import Button from "components/common/Button";
import Input from "components/common/Input";
import {
  AlphabetCharacter,
  AlphabetForms,
  AlphabetTypes,
} from "types/alphabet";
import { Answer } from "types/game";
import Footer from "./Footer";
import getAPIKana from "api/getKana";
import Spinner from "components/common/Spinner";
import getRandomFromArray from "utils/getRandomFromArray";

interface IProps {
  onAnswer: (answer: Answer) => void;
  form: AlphabetForms;
  types: AlphabetTypes[];
}

const GuessCharacter = ({ onAnswer, form, types }: IProps) => {
  const [inputValue, setInputValue] = useState("");
  const playedCharsRef = useRef<Set<string>>(new Set<string>());
  const [kana, setKana] = useState<AlphabetCharacter[]>([]);
  const [currentCharacter, setCurrentCharacter] =
    useState<AlphabetCharacter | null>(null);
  const currentAlphabet = useMemo(
    () => kana.filter((item) => types.includes(item.type)),
    [types, kana]
  );

  useEffect(() => {
    async function getKana() {
      try {
        const response = await getAPIKana();
        setKana(response.data);
      } catch (error) {}
    }

    getKana();
  }, []);

  useEffect(() => {
    if (currentAlphabet.length > 0) {
      setCurrentCharacter(getRandomFromArray(currentAlphabet));
    }
  }, [currentAlphabet]);

  const onChangeInputValue = (event: React.ChangeEvent<HTMLInputElement>) =>
    setInputValue(event.target.value);

  const nextChar = () => {
    const { current: playedChars } = playedCharsRef;
    const newPlayedChars = new Set([...playedChars, currentCharacter!.romaji]);
    console.log(newPlayedChars);
    let nextChar = getRandomFromArray(currentAlphabet);

    while (newPlayedChars.has(nextChar.romaji)) {
      nextChar = getRandomFromArray(currentAlphabet);
    }

    playedCharsRef.current = newPlayedChars;
    setCurrentCharacter(nextChar);
  };

  const checkAnswer = () => {
    nextChar();
    onAnswer({
      character: currentCharacter!,
      value:
        currentCharacter!.romaji === inputValue.trim().toLocaleLowerCase()
          ? "correct"
          : "incorrect",
      userInput: inputValue,
    });
    setInputValue("");
  };

  const skipAnswer = () => {
    nextChar();
    onAnswer({ userInput: "", character: currentCharacter!, value: "skip" });
    setInputValue("");
  };

  if (currentCharacter == null) {
    return <Spinner size="lg" />;
  }

  return (
    <>
      <div className="text-9xl font-japanese mb-8">
        {currentCharacter[form]}
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
