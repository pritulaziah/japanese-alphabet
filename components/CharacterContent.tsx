import { AlphabetCharacter, AlphabetTypes } from "types/alphabet";
import { getAlphabetTypeStyles } from "constants/japanese";
import Modal from "components/common/Modal";

interface IProps {
  character: AlphabetCharacter;
}

const getHighlightedChar = (
  japaneseStr: string,
  currentChar: string,
  type: AlphabetTypes
) => {
  const alphabetTypeStyle = getAlphabetTypeStyles(type).getHighlight?.();
  let result: React.ReactNode[] = [];
  japaneseStr = japaneseStr.replaceAll(currentChar, "$");

  for (let i = 0; i <= japaneseStr.length; i++) {
    const japaneseChar = japaneseStr[i];

    if (japaneseChar === "$") {
      result.push(
        <span key={i} className={alphabetTypeStyle}>
          {currentChar}
        </span>
      );
    } else {
      result.push(japaneseChar);
    }
  }

  return <>{result}</>;
};

const CharacterContent = ({ character }: IProps) => {
  return (
    <>
      <Modal.Header className="font-japanese">
        {character.hiragana.character}
      </Modal.Header>
      <Modal.Body>
        <div className="flex flex-col mb-3">
          <div>
            <span className="text-neutral-500 dark:text-neutral-400">
              На ромадзи:{" "}
            </span>
            <span className="text-neutral-900 dark:text-neutral-200">
              {character.romaji}
            </span>
          </div>
          <div>
            <span className="text-neutral-500 dark:text-neutral-400">
              На русском:{" "}
            </span>
            <span className="text-neutral-900 dark:text-neutral-200">
              {character.ru}
            </span>
          </div>
        </div>
        {character.hiragana.image && (
          <div className="flex mb-3">
            <img className="h-auto" src={character.hiragana.image} alt="" />
          </div>
        )}
        {character.hiragana.examples.length > 0 && (
          <>
            <h3 className="mb-1.5 text-md text-neutral-700 dark:text-neutral-200">
              Примеры:{" "}
            </h3>
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
          </>
        )}
      </Modal.Body>
    </>
  );
};

export default CharacterContent;
