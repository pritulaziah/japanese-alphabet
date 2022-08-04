import { AlphabetTypes, AlphabetKind } from "types/alphabet";
import capitalize from "utils/capitalize";
import { alphabetTypes } from "constants/japanese";
import clsx from "clsx";
import ThemeToggle from "./ThemeToggle";
import useIsMounted from "hooks/useIsMounted";
import SegmentedControl from "components/SegmentedControl";

interface IProps {
  onChangeVisibleType: (type: AlphabetTypes) => void;
  visibleTypes: AlphabetTypes[];
}

const alphabets = [
  { label: "Hiragana", value: AlphabetKind.Hiragana },
  { label: "Katakana", value: AlphabetKind.Katakana },
];

const Settings = ({ visibleTypes, onChangeVisibleType }: IProps) => {
  const isMounted = useIsMounted();

  return (
    <div className="relative hidden lg:block lg:basis-1/6 xl:basis-1/5">
      <div className="sticky top-0 min-h-screen shadow-sidebar p-4 bg-gray-50 dark:bg-gray-800 flex flex-col justify-between">
        <div className="flex flex-col mb-3">
          <div className="text-lg xl:text-xl pb-4 mb-4 text-center xl:text-left border-b dark:border-gray-600">
            <SegmentedControl segments={alphabets} />
          </div>
          <ul className="list-none">
            {alphabetTypes.map((alphabetType) => (
              <li key={alphabetType.type} className="mb-3 last-of-type:mb-0">
                <button
                  onClick={() => onChangeVisibleType(alphabetType.type)}
                  className={clsx(
                    "w-full font-medium rounded-lg border flex items-center justify-center py-2 px-1.5 xl:py-3 xl:px-2 cursor-pointer transition-colors transition-opacity",
                    alphabetType.styles.getCell(),
                    visibleTypes.includes(alphabetType.type)
                      ? "opacity-100"
                      : "opacity-50"
                  )}
                >
                  <span className="flex flex-col xl:inline-block">
                    <span>{capitalize(alphabetType.type)}</span>{" "}
                    <span>{`(${alphabetType.ru})`}</span>
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
        {isMounted && <ThemeToggle />}
      </div>
    </div>
  );
};

export default Settings;
