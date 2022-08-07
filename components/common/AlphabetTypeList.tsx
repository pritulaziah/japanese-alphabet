import clsx from "clsx";
import { AlphabetTypes } from "types/alphabet";
import { alphabetTypes } from "constants/japanese";
import capitalize from "utils/capitalize";
import useStore from "hooks/useStore";
import { ActionTypes } from "types/store";

const AlphabetTypeList = () => {
  const { state, dispatch } = useStore();
  const { visibleTypes } = state;

  const onChangeVisibleType = (type: AlphabetTypes) => {
    const prevVisibleTypes = new Set(visibleTypes);

    if (prevVisibleTypes.has(type)) {
      prevVisibleTypes.delete(type);
    } else {
      prevVisibleTypes.add(type);
    }

    dispatch({ type: ActionTypes.ChangeTypes, payload: [...prevVisibleTypes] });
  };

  return (
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
            <div className="flex flex-col xl:inline-block">
              <span>{capitalize(alphabetType.type)}</span>{" "}
              <span>{`(${alphabetType.ru})`}</span>
            </div>
          </button>
        </li>
      ))}
    </ul>
  );
};

export default AlphabetTypeList;
