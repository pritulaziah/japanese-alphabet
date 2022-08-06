import { AlphabetCharacter } from "types/alphabet";

export type Answer = {
  character: AlphabetCharacter;
  userInput: string;
  value: "correct" | "incorrect" | "skip";
};
