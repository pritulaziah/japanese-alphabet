import { AlphabetTypes } from "types/alphabet";
import capitalize from "utils/capitalize";
import { alphabetTypeColors } from "constants/japanese";
import clsx from "clsx";

interface IProps {
  onChangeVisibleType: (type: AlphabetTypes) => void;
  visibleTypes: AlphabetTypes[];
}

type AlphabetType = {
  type: AlphabetTypes;
  styles: string;
  ru: string;
};

const alphabetTypes: AlphabetType[] = [
  {
    type: AlphabetTypes.Gojuuon,
    styles: alphabetTypeColors[AlphabetTypes.Gojuuon],
    ru: "годзюон",
  },
  {
    type: AlphabetTypes.Dakuon,
    styles: alphabetTypeColors[AlphabetTypes.Dakuon],
    ru: "дакутэн",
  },
  {
    type: AlphabetTypes.Youon,
    styles: alphabetTypeColors[AlphabetTypes.Youon],
    ru: "ёон",
  },
  {
    type: AlphabetTypes.Handakuon,
    styles: alphabetTypeColors[AlphabetTypes.Handakuon],
    ru: "хандакутэн",
  },
  {
    type: AlphabetTypes.Sokuon,
    styles: alphabetTypeColors[AlphabetTypes.Sokuon],
    ru: "сокуон",
  },
];

const Settings = ({ visibleTypes, onChangeVisibleType }: IProps) => {
  return (
    <div className="relative basis-1/5">
      <div className="sticky top-0 min-h-screen shadow-sidebar p-4 bg-gray-800">
        <h3 className="text-xl border-b border-gray-400 pb-2.5 mb-4">
          Hiragana (хирагана)
        </h3>
        <ul className="list-none">
          {alphabetTypes.map((alphabetType) => (
            <li key={alphabetType.type} className="mb-3 last-of-type:mb-0">
              <button
                onClick={() => onChangeVisibleType(alphabetType.type)}
                className={clsx(
                  "w-full font-medium rounded-lg border flex items-center justify-center py-3 px-2 cursor-pointer transition-colors transition-opacity",
                  alphabetType.styles,
                  visibleTypes.includes(alphabetType.type)
                    ? "opacity-100"
                    : "opacity-50"
                )}
              >
                <span>
                  {capitalize(alphabetType.type)} {`(${alphabetType.ru})`}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Settings;
