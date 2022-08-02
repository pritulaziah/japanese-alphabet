import { createContext } from "react";
import { Theme } from "types/theme";

const ThemeContext = createContext<Theme>({} as Theme);

export default ThemeContext;
