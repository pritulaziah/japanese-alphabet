import { AlphabetCharacter } from "types/alphabet";
import clsx from "clsx";

interface IProps {
  active: boolean;
  className: string;
  onClick?: () => void;
  romaji: AlphabetCharacter["romaji"];
  ru: AlphabetCharacter["ru"];
  char: string;
}

const Character = ({
  active = true,
  char,
  ru,
  romaji,
  className,
  onClick,
}: IProps) => {
  return (
    <div
      className={clsx(
        "flex flex-col cursor-pointer p-4 border transition-colors transition-opacity",
        className,
        active ? "opacity-100" : "opacity-50"
      )}
      onClick={onClick}
    >
      <span className="text-2xl text-center font-japanese">{char}</span>
      <span className="text-gray-700 dark:text-gray-400">{ru}</span>
      <span className="text-gray-700 dark:text-gray-400">{romaji}</span>
    </div>
  );
};

export default Character;
