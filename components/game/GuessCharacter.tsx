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
import { getAPIKana } from "pages/api/kana";
import Spinner from "components/common/Spinner";
import getRandomFromArray from "utils/getRandomFromArray";

interface IProps {
  onAnswer: (answer: Answer) => void;
  form: AlphabetForms;
  types: AlphabetTypes[];
}

const GuessCharacter = ({ onAnswer, form, types }: IProps) => {
  // State
  const [inputValue, setInputValue] = useState("");
  const [kana, setKana] = useState<AlphabetCharacter[]>([]);
  const [currentCharacter, setCurrentCharacter] =
    useState<AlphabetCharacter | null>(null);
  // Refs
  const inputRef = useRef<HTMLInputElement>(null);
  const playedCharsRef = useRef<Set<string>>(new Set<string>());
  // Data
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

  useEffect(() => {
    inputRef.current?.focus();
  }, [currentCharacter]);

  if (currentCharacter == null) {
    return <Spinner size="lg" />;
  }

  const createAnswer = ({ value, userInput }: Omit<Answer, "character">) => {
    const { current: playedChars } = playedCharsRef;
    const newPlayedChars = new Set([...playedChars, currentCharacter.romaji]);
    let nextChar = getRandomFromArray(currentAlphabet);

    while (newPlayedChars.has(nextChar.romaji)) {
      nextChar = getRandomFromArray(currentAlphabet);
    }

    playedCharsRef.current = newPlayedChars;
    setCurrentCharacter(nextChar);
    onAnswer({
      character: currentCharacter,
      value,
      userInput,
    });
    setInputValue("");
  };

  const checkAnswer = () => {
    createAnswer({
      value:
        currentCharacter.romaji === inputValue.trim().toLocaleLowerCase()
          ? "correct"
          : "incorrect",
      userInput: inputValue,
    });
  };

  return (
    <>
      <div className="text-9xl font-japanese mb-8">
        {currentCharacter[form]}
      </div>
      <div className="min-w-[30%]">
        <Input
          value={inputValue}
          onChange={(event) => setInputValue(event.target.value)}
          placeholder="Ваш ответ"
          ref={inputRef}
        />
      </div>
      <Footer>
        <Button
          color="alternative"
          onClick={() => createAnswer({ userInput: "", value: "skip" })}
        >
          Skip
        </Button>
        <Button className="w-40" onClick={checkAnswer}>
          Check
        </Button>
      </Footer>
    </>
  );
};

export default GuessCharacter;
