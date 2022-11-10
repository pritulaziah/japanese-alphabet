import type { AlphabetCharacter } from "types/alphabet";

export interface Cell {
  name?: string;
  value: string;
  hidden?: boolean;
  meaning: (character: AlphabetCharacter) => boolean;
  className: string;
}
