import clsx from "clsx";
import { AlphabetTypes } from "types/alphabet";
import alphabetTypes from "constants/alphabetTypes";
import capitalize from "utils/capitalize";
import Checkbox from "./Checkbox";

interface IProps {
  checkboxView?: boolean;
  mode?: "checkbox" | "button";
  hidden?: AlphabetTypes[];
  types: AlphabetTypes[];
  onChange: (types: AlphabetTypes[]) => void;
}

const AlphabetTypeList = ({
  types,
  mode = "button",
  hidden = [],
  onChange,
}: IProps) => {
  const changeTypes = (type: AlphabetTypes) => {
    const newTypes = new Set(types);

    if (newTypes.has(type)) {
      newTypes.delete(type);
    } else {
      newTypes.add(type);
    }

    onChange([...newTypes]);
  };

  return (
    <ul className="list-none">
      {alphabetTypes
        .filter(
          (alphabetType) =>
            hidden.length === 0 || !hidden.includes(alphabetType.type)
        )
        .map((alphabetType) => {
          const active = types.includes(alphabetType.type);
          const isModeButton = mode === "button";

          const onChangeVisibleType = () => changeTypes(alphabetType.type);

          return (
            <li
              key={alphabetType.type}
              className={clsx(
                "last-of-type:mb-0",
                isModeButton ? "mb-3" : "mb-1"
              )}
            >
              {isModeButton ? (
                <button
                  onClick={onChangeVisibleType}
                  className={clsx(
                    "w-full font-medium rounded-lg border flex items-center justify-center py-2 px-1.5 xl:py-3 xl:px-2 cursor-pointer transition-colors transition-opacity",
                    alphabetType.styles.getCell(),
                    active ? "opacity-100" : "opacity-50"
                  )}
                >
                  <div className="flex flex-col xl:inline-block">
                    <span>{capitalize(alphabetType.type)}</span>{" "}
                    <span>{`(${alphabetType.ru})`}</span>
                  </div>
                </button>
              ) : (
                <Checkbox onChange={onChangeVisibleType} checked={active}>
                  <div className="flex flex-col xl:inline-block">
                    <span>{capitalize(alphabetType.type)}</span>{" "}
                    <span>{`(${alphabetType.ru})`}</span>
                  </div>
                </Checkbox>
              )}
            </li>
          );
        })}
    </ul>
  );
};

export default AlphabetTypeList;
