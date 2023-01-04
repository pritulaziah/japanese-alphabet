import { AlphabetForms } from "types/alphabet";
import capitalize from "utils/capitalize";

const alphabetForms = Object.entries(AlphabetForms).map(([label, value]) => ({
  label: capitalize(label),
  value,
}));

export default alphabetForms;
