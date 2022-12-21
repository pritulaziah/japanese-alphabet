import {
  AlphabetCharacter,
  AlphabetTypes,
  AlphabetForms,
} from "types/alphabet";
import getAlphabetTypeStyles from "utils/getAlphabetTypeStyles";
import Modal from "components/common/Modal";
import React, { useEffect, useState } from "react";
import Spinner from "components/common/Spinner";

const getHighlightChar = (
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

interface IProps {
  character: AlphabetCharacter;
  form: AlphabetForms;
}

const CharacterContent = ({ character, form }: IProps) => {
  const currentFormCharacter = character[form];
  const [icon, setIcon] = useState<null | {
    default: React.ComponentType;
  }>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadKanjiIcon = async () => {
      if (currentFormCharacter.length === 1) {
        setIsLoading(true);
        const characterIcon = await import(
          `kanji-react-icons/dist/${form}/${currentFormCharacter}.js`
        );

        characterIcon && setIcon(characterIcon);
        setIsLoading(false);
      }
    };

    loadKanjiIcon();
  }, [form, currentFormCharacter]);

  return (
    <>
      <Modal.Header className="font-japanese">
        {currentFormCharacter}
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
        {isLoading ? (
          <Spinner size="md" />
        ) : (
          icon?.default && (
            <div className="w-max h-64 dark:[&_path]:!stroke-white dark:hover:[&_path]:!stroke-red-500 hover:[&_path]:!stroke-red-600 [&_path]:transition-[stroke] [&_path]:duration-250 cursor-pointer">
              <icon.default />
            </div>
          )
        )}
        {/* {currentForm.examples.length > 0 && (
          <>
            <h3 className="mb-1.5 text-md text-neutral-700 dark:text-neutral-200">
              Примеры:{" "}
            </h3>
            <ul className="list-none">
              {currentForm.examples.map((example, index) => (
                <li key={index} className="mb-4 last-of-type:mb-0">
                  <div className="flex">
                    <span className="mr-2 text-neutral-400">{index + 1}.</span>
                    <div className="flex flex-col">
                      <span
                        lang="ja"
                        className="font-japanese text-xl text-neutral-900 dark:text-neutral-50 mb-1"
                      >
                        {getHighlightChar(
                          example.japanese,
                          currentForm.character,
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
        )} */}
      </Modal.Body>
    </>
  );
};

export default CharacterContent;
