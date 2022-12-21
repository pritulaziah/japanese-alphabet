import { Cell } from "./KanaTable.interface";
import { AlphabetTypes, AlphabetCharacter } from "types/alphabet";

function isCharEqual(this: Cell, character: AlphabetCharacter) {
  return character.romaji === this.value;
}

function isLastCharEqual(this: Cell, character: AlphabetCharacter) {
  if ([AlphabetTypes.Youon].includes(character.type)) {
    return false;
  }

  const multipleMeanings = character.romaji.split(" ");
  const targetMeaning =
    multipleMeanings.length === 1
      ? multipleMeanings[0]
      : multipleMeanings[1].replace("(", "").replace(")", "");

  return targetMeaning[targetMeaning.length - 1] === this.value;
}

function isFirstCharEqual(this: Cell, character: AlphabetCharacter) {
  return character.romaji.length > 1 && character.romaji[0] === this.value;
}

function isLastCharsEqual(this: Cell, character: AlphabetCharacter) {
  return (
    [AlphabetTypes.Youon].includes(character.type) &&
    [this.value, this.value.slice(-1)].some((item) =>
      character.romaji.includes(item)
    )
  );
}

export const columns: Cell[] = [
  {
    value: "a",
    meaning: isLastCharEqual,
    className: "md:col-start-2 md:col-end-3",
  },
  {
    value: "i",
    meaning: isLastCharEqual,
    className: "md:col-start-3 md:col-end-4",
  },
  {
    value: "u",
    meaning: isLastCharEqual,
    className: "md:col-start-4 md:col-end-5",
  },
  {
    value: "e",
    meaning: isLastCharEqual,
    className: "md:col-start-5 md:col-end-6",
  },
  {
    value: "o",
    meaning: isLastCharEqual,
    className: "md:col-start-6 md:col-end-7",
  },
  {
    value: "n",
    hidden: true,
    meaning: isCharEqual,
    className: "md:col-start-2 md:col-end-7 text-center",
  },
  {
    value: "ya",
    meaning: isLastCharsEqual,
    className: "md:col-start-8 md:col-end-9",
  },
  {
    value: "yu",
    meaning: isLastCharsEqual,
    className: "md:col-start-9 md:col-end-10",
  },
  {
    value: "yo",
    meaning: isLastCharsEqual,
    className: "md:col-start-10 md:col-end-11",
  },
  {
    value: "(pause)",
    meaning: isCharEqual,
    hidden: true,
    className: "md:col-start-8 md:col-end-11",
  },
];

export const rows: Cell[] = [
  {
    name: "",
    value: "gojuuon-chars",
    meaning: (character) =>
      ["a", "i", "u", "e", "o"].includes(character.romaji),
    className: "md:row-start-2 md:row-end-3",
  },
  {
    value: "k",
    meaning: isFirstCharEqual,
    className: "md:row-start-3 md:row-end-4",
  },
  {
    value: "s",
    meaning(character) {
      return [this.value, "sh"].some(
        (item) =>
          character.romaji.slice(0, character.romaji.length - 1) === item
      );
    },
    className: "md:row-start-4 md:row-end-5",
  },
  {
    value: "t",
    meaning(character) {
      return [this.value, "ch", "ts"].some(
        (item) =>
          character.romaji.slice(0, character.romaji.length - 1) === item
      );
    },
    className: "md:row-start-5 md:row-end-6",
  },
  {
    value: "n",
    meaning: isFirstCharEqual,
    className: "md:row-start-6 md:row-end-7",
  },
  {
    value: "h",
    meaning(character) {
      if (character.type === AlphabetTypes.Gojuuon) {
        return [this.value, "f"].includes(character.romaji[0]);
      } else {
        return isFirstCharEqual.call(this, character);
      }
    },
    className: "md:row-start-7 md:row-end-8",
  },
  {
    value: "m",
    meaning: isFirstCharEqual,
    className: "md:row-start-8 md:row-end-9",
  },
  {
    value: "y",
    meaning: isFirstCharEqual,
    className: "md:row-start-9 md:row-end-10",
  },
  {
    value: "r",
    meaning: isFirstCharEqual,
    className: "md:row-start-10 md:row-end-11",
  },
  {
    value: "w",
    meaning: isFirstCharEqual,
    className: "md:row-start-11 md:row-end-12",
  },
  {
    name: "ɴ",
    value: "n",
    meaning: isCharEqual,
    className: "md:row-start-12 md:row-end-13",
  },
  {
    value: "g",
    meaning: isFirstCharEqual,
    className: "md:row-start-14 md:row-end-15",
  },
  {
    value: "z",
    meaning(character) {
      return (
        character.romaji.split(" ").length === 1 &&
        [this.value, "j"].includes(character.romaji[0])
      );
    },
    className: "md:row-start-15 md:row-end-16",
  },
  {
    value: "d",
    meaning(character) {
      const multipleMeanings = character.romaji.split(" ");
      const targetMeaning =
        multipleMeanings.length === 1
          ? multipleMeanings[0]
          : multipleMeanings[1].replace("(", "").replace(")", "");

      return [this.value, "dz", "dj"].some(
        (item) => targetMeaning.slice(0, targetMeaning.length - 1) === item
      );
    },
    className: "md:row-start-16 md:row-end-17",
  },
  {
    value: "b",
    meaning: isFirstCharEqual,
    className: "md:row-start-17 md:row-end-18",
  },
  {
    value: "p",
    meaning: isFirstCharEqual,
    className: "md:row-start-18 md:row-end-19",
  },
  {
    value: "(pause)",
    meaning: isCharEqual,
    hidden: true,
    className: "md:row-start-19 md:row-end-20",
  },
];
