import axios from "axios";
import { AlphabetCharacter } from "types/alphabet";

const getAPIKana = () => axios.get<AlphabetCharacter[]>("/api/kana");

export default getAPIKana;
