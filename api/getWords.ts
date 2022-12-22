import axios from "axios";
import { AlphabetCharacter } from "types/alphabet";

const getWords = () => axios.get<AlphabetCharacter[]>("/api/kana");

export default getWords;
