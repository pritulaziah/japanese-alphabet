import { useMemo, useState, useEffect } from "react";
import Button from "components/common/Button";
import Input from "components/common/Input";
import useStore from "hooks/useStore";
import { AlphabetCharacter } from "types/alphabet";
import { Answer } from "types/game";
import Footer from "./Footer";
import axios from "axios";
import Spinner from "components/common/Spinner";

const randomCharacter = (alphabet: AlphabetCharacter[]) => {
  return alphabet[Math.floor(Math.random() * alphabet.length)];
};

interface IProps {
  onAnswer: (answer: Answer) => void;
}

const GuessCharacter = ({ onAnswer }: IProps) => {
  const { state } = useStore();
  const [kana, setKana] = useState<AlphabetCharacter[]>([]);

  useEffect(() => {
    async function getKana() {
      try {
        const response = await axios.get<AlphabetCharacter[]>("/api/kana");
        setKana(response.data);
      } catch (error) {}
    }

    getKana();
  }, []);

  const currentAlphabet = useMemo(
    () => kana.filter((item) => state.visibleTypes.includes(item.type)),
    [state.visibleTypes, kana]
  );
  const [inputValue, setInputValue] = useState("");
  const [playedChars, setPlayedChars] = useState<Set<string>>(
    new Set<string>()
  );

  const [currentCharacter, setCurrentCharacter] =
    useState<AlphabetCharacter | null>(null);

  useEffect(() => {
    if (currentAlphabet.length > 0) {
      setCurrentCharacter(randomCharacter(currentAlphabet));
    }
  }, [currentAlphabet]);

  const onChangeInputValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const nextChar = () => {
    const newPlayedChars = new Set([...playedChars, currentCharacter!.romaji]);
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
        {currentCharacter.hiragana}
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
