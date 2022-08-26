import { AlphabetTypes } from "types/alphabet";
import alphabetTypes from "constants/alphabetTypes";

const getAlphabetTypeStyles = (type: AlphabetTypes) => {
  const alphabetType = alphabetTypes.find(
    (alphabetType) => alphabetType.type === type
  );

  return alphabetType!.styles;
};

export default getAlphabetTypeStyles;
