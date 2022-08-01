import { AlphabetTypes } from "types/alphabet";
import capitalize from "utils/capitalize";
import { alphabetTypeColors } from "./constants";
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
    name: capitalize(AlphabetTypes.Gojuuon),
  },
  {
    type: AlphabetTypes.Dakuon,
    styles: alphabetTypeColors[AlphabetTypes.Dakuon],
    nameRu: "дакутэн",
    name: capitalize(AlphabetTypes.Dakuon),
  },
  {
    type: AlphabetTypes.Youon,
    styles: alphabetTypeColors[AlphabetTypes.Youon],
    nameRu: "ёон",
    name: capitalize(AlphabetTypes.Youon),
  },
];

const Settings = ({ visibleTypes, onChangeVisibleType }: IProps) => {
  return (
    <div className="relative h-full">
      <div className="sticky top-0 min-h-screen bg-gray-800 p-4 bg-gray-800 shadow-sidebar">
        <h3 className="text-lg border-b border-gray-400 pb-2 mb-2">
          Hiragana (хирагана)
        </h3>
        <ul className="list-none">
          {alphabetTypes.map((alphabetType) => (
            <li key={alphabetType.type} className="mb-3 last-of-type:mb-0">
              <button
                onClick={() => onChangeVisibleType(alphabetType.type)}
                className={clsx(
                  "w-full font-medium rounded-lg border flex items-center justify-center py-3 px-2 cursor-pointer",
                  alphabetType.styles,
                  !visibleTypes.includes(alphabetType.type) && "opacity-50"
                )}
              >
                <span>
                  {alphabetType.name} {`(${alphabetType.nameRu})`}
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
