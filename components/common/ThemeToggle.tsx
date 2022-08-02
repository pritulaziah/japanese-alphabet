import clsx from "clsx";
import useTheme from "hooks/useTheme";

const lightIcon = (
  <svg
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
  >
    <path d="M12,7c-2.76,0-5,2.24-5,5s2.24,5,5,5s5-2.24,5-5S14.76,7,12,7L12,7z M2,13l2,0c0.55,0,1-0.45,1-1s-0.45-1-1-1l-2,0 c-0.55,0-1,0.45-1,1S1.45,13,2,13z M20,13l2,0c0.55,0,1-0.45,1-1s-0.45-1-1-1l-2,0c-0.55,0-1,0.45-1,1S19.45,13,20,13z M11,2v2 c0,0.55,0.45,1,1,1s1-0.45,1-1V2c0-0.55-0.45-1-1-1S11,1.45,11,2z M11,20v2c0,0.55,0.45,1,1,1s1-0.45,1-1v-2c0-0.55-0.45-1-1-1 C11.45,19,11,19.45,11,20z M5.99,4.58c-0.39-0.39-1.03-0.39-1.41,0c-0.39,0.39-0.39,1.03,0,1.41l1.06,1.06 c0.39,0.39,1.03,0.39,1.41,0s0.39-1.03,0-1.41L5.99,4.58z M18.36,16.95c-0.39-0.39-1.03-0.39-1.41,0c-0.39,0.39-0.39,1.03,0,1.41 l1.06,1.06c0.39,0.39,1.03,0.39,1.41,0c0.39-0.39,0.39-1.03,0-1.41L18.36,16.95z M19.42,5.99c0.39-0.39,0.39-1.03,0-1.41 c-0.39-0.39-1.03-0.39-1.41,0l-1.06,1.06c-0.39,0.39-0.39,1.03,0,1.41s1.03,0.39,1.41,0L19.42,5.99z M7.05,18.36 c0.39-0.39,0.39-1.03,0-1.41c-0.39-0.39-1.03-0.39-1.41,0l-1.06,1.06c-0.39,0.39-0.39,1.03,0,1.41s1.03,0.39,1.41,0L7.05,18.36z" />
  </svg>
);

const darkIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    viewBox="0 0 24 24"
  >
    <path d="M12,3c-4.97,0-9,4.03-9,9s4.03,9,9,9s9-4.03,9-9c0-0.46-0.04-0.92-0.1-1.36c-0.98,1.37-2.58,2.26-4.4,2.26 c-2.98,0-5.4-2.42-5.4-5.4c0-1.81,0.89-3.42,2.26-4.4C12.92,3.04,12.46,3,12,3L12,3z" />
  </svg>
);

const ThemeToggle = () => {
  const { scheme, onChangeScheme } = useTheme();
  const checked = scheme === "dark";

  return (
    <label
      htmlFor="theme-toggle"
      className="inline-flex relative items-center cursor-pointer"
    >
      <input
        type="checkbox"
        id="theme-toggle"
        className="sr-only peer"
        checked={checked}
        onChange={(event) =>
          onChangeScheme(event.target.checked ? "dark" : "light")
        }
      />
      <div className="w-16 h-8 bg-gray-200/75 dark:bg-gray-700 rounded-full relative">
        <span
          className={clsx(
            "w-6 h-6 flex absolute rounded-full bg-white dark:bg-gray-900 left-0 p-1 top-1 transition-transform duration-300 ml-1",
            checked && "translate-x-10 -ml-1"
          )}
        >
          {checked ? darkIcon : lightIcon}
        </span>
      </div>
      <span className="ml-2 font-medium">{`${
        checked ? "Темная" : "Светлая"
      } тема`}</span>
    </label>
  );
};

export default ThemeToggle;
