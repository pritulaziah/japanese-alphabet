import { AlphabetCharacter, AlphabetTypes } from "types/alphabet";
import { getAlphabetTypeStyles } from "constants/japanese";
import clsx from "clsx";

interface IProps {
  character: AlphabetCharacter;
}

const getHighlightedChar = (
  japaneseStr: string,
  currentChar: string,
  type: AlphabetTypes
) => {
  let result: React.ReactNode[] = [];

  for (let japaneseChar of japaneseStr.replaceAll(currentChar, "$")) {
    if (japaneseChar === "$") {
      const alphabetTypeStyle = getAlphabetTypeStyles(type);

      result.push(
        <span className={clsx(alphabetTypeStyle.getHighlight?.())}>
          {currentChar}
        </span>
      );
    } else {
      result.push(japaneseChar);
    }
  }

  return <>{result}</>;
};

const Examples = ({ character }: IProps) => {
  return (
    <ul className="list-none">
      {character.hiragana.examples.map((example, index) => (
        <li key={index} className="mb-4 last-of-type:mb-0">
          <div className="flex">
            <span className="mr-2 text-neutral-400">{index + 1}.</span>
            <div className="flex flex-col">
              <span
                lang="ja"
                className="font-japanese text-xl text-neutral-900 dark:text-neutral-50 mb-1"
              >
                {getHighlightedChar(
                  example.japanese,
                  character.hiragana.character,
                  character.type
                )}
              </span>
              <span className="text-neutral-600 dark:text-neutral-200">
                {example.romaji}
              </span>
              <span className="text-neutral-500 dark:text-neutral-400 text-sm">
                {example.meaning}
              </span>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default Examples;
