import { AlphabetTypes } from "types/alphabet";
import capitalize from "utils/capitalize";
import { alphabetTypeColors } from "constants/japanese";
import clsx from "clsx";

interface IProps {
  onChangeVisibleType: (type: AlphabetTypes) => void;
  visibleTypes: AlphabetTypes[];
}

const alphabetTypes = [
  {
    type: AlphabetTypes.Gojuuon,
    styles: alphabetTypeColors[AlphabetTypes.Gojuuon],
    nameRu: "годзюон",
  },
  {
    type: AlphabetTypes.Dakuon,
    styles: alphabetTypeColors[AlphabetTypes.Dakuon],
    nameRu: "дакутэн",
  },
  {
    type: AlphabetTypes.Youon,
    styles: alphabetTypeColors[AlphabetTypes.Youon],
    nameRu: "ёон",
  },
  {
    type: AlphabetTypes.Handakuon,
    styles: alphabetTypeColors[AlphabetTypes.Handakuon],
    nameRu: "хандакутэн",
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
                  "w-full font-medium rounded-lg border flex items-center justify-center py-3 px-2 cursor-pointer transition-colors",
                  alphabetType.styles,
                  !visibleTypes.includes(alphabetType.type) && "opacity-50"
                )}
              >
                <span>
                  {capitalize(alphabetType.type)} {`(${alphabetType.nameRu})`}
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
