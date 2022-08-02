import { useCallback, useMemo, useState } from "react";
import ThemeContext from "contexts/ThemeContext";
import { Schemes } from "types/theme";
import getLocalStorage from "utils/getLocalStorage";
import canUseDOM from "utils/canUseDOM";

interface ThemeProviderProps {
  children: React.ReactNode;
}

const getInitScheme = () => {
  if (canUseDOM) {
    const localStorage = getLocalStorage();

    if (localStorage) {
      const persistedColorPreference = localStorage.getItem("theme");

      if (
        persistedColorPreference &&
        ["light", "dark"].some((theme) => persistedColorPreference)
      ) {
        return persistedColorPreference as Schemes;
      }
    }

    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }

  return "light";
};

const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [scheme, setScheme] = useState<Schemes>(getInitScheme);

  const onChangeScheme = useCallback((newScheme: Schemes) => {
    setScheme(newScheme);
    const localStorage = getLocalStorage();
    localStorage && localStorage.setItem("theme", newScheme);
    newScheme === "dark"
      ? document.documentElement.classList.add("dark")
      : document.documentElement.classList.remove("dark");
  }, []);

  const value = useMemo(
    () => ({ scheme, onChangeScheme }),
    [scheme, onChangeScheme]
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

export default ThemeProvider;
