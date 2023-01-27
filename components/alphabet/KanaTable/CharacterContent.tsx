import {
  AlphabetCharacter,
  AlphabetTypes,
  AlphabetForms,
} from "types/alphabet";
import { getAPIWords } from "pages/api/words";
import { IWord } from "types/word";
import getAlphabetTypeStyles from "utils/getAlphabetTypeStyles";
import Modal from "components/common/Modal";
import React, { useEffect, useState } from "react";
import Spinner from "components/common/Spinner";

const getStrWithHighlightChar = (
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
  const [iconInfo, setIconInfo] = useState<{
    icon: { default: React.ComponentType } | null;
    isLoading: boolean;
  }>({ isLoading: false, icon: null });
  const [examplesData, setExamplesData] = useState<{
    examples: null | IWord[];
    isLoading: boolean;
  }>({
    examples: null,
    isLoading: false,
  });

  useEffect(() => {
    const loadKanjiIcon = async () => {
      if (currentFormCharacter.length === 1) {
        setIconInfo((prevState) => ({ ...prevState, isLoading: true }));
        const characterIcon = await import(
          `kanji-react-icons/dist/${form}/${currentFormCharacter}.js`
        );

        setIconInfo({
          icon: characterIcon,
          isLoading: false,
        });
      }
    };

    loadKanjiIcon();
  }, [form, currentFormCharacter]);

  useEffect(() => {
    const getExamples = async () => {
      setExamplesData((prevState) => ({ ...prevState, isLoading: true }));
      const response = await getAPIWords({
        search: currentFormCharacter,
        offset: 0,
        limit: 3,
      });

      setExamplesData({
        examples: response.data.data,
        isLoading: false,
      });
    };

    getExamples();
  }, []);

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
        {iconInfo.isLoading ? (
          <Spinner size="md" />
        ) : (
          iconInfo.icon?.default && (
            <div className="w-max h-64 dark:[&_path]:!stroke-white dark:hover:[&_path]:!stroke-red-500 hover:[&_path]:!stroke-red-600 [&_path]:transition-[stroke] [&_path]:duration-250 cursor-pointer">
              <iconInfo.icon.default />
            </div>
          )
        )}
        {examplesData.isLoading ? (
          <Spinner size="md" />
        ) : (
          examplesData.examples != null &&
          examplesData.examples.length > 0 && (
            <>
              <h3 className="mb-1.5 text-md text-neutral-700 dark:text-neutral-200">
                Примеры:{" "}
              </h3>
              <ul className="list-none">
                {examplesData.examples.map((example, index) => (
                  <li key={index} className="mb-4 last-of-type:mb-0">
                    <div className="flex">
                      <span className="mr-2 text-neutral-400">
                        {index + 1}.
                      </span>
                      <div className="flex flex-col">
                        <span
                          lang="ja"
                          className="font-japanese text-xl text-neutral-900 dark:text-neutral-50 mb-1"
                        >
                          {getStrWithHighlightChar(
                            example.japanese,
                            currentFormCharacter,
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
          )
        )}
      </Modal.Body>
    </>
  );
};

export default CharacterContent;
