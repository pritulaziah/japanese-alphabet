/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "dark",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./constants/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      japanese: ["Hiragino Sans GB W3", "Helvetica", "Arial"],
    },
    extend: {
      gridTemplateColumns: {
        table: "auto repeat(5, minmax(0, 1fr)) auto repeat(3, minmax(0, 1fr))",
      },
      boxShadow: {
        sidebar: "-2px 5px 10px rgb(0 0 0 / 30%)",
        navigation: "2px 5px 10px rgb(0 0 0 / 30%)",
      },
      gridRowStart: {
        8: "8",
        9: "9",
        10: "10",
        11: "11",
        12: "12",
        13: "13",
        14: "14",
        15: "15",
        16: "16",
        17: "17",
        18: "18",
        19: "19",
        20: "20",
      },
      gridRowEnd: {
        8: "8",
        9: "9",
        10: "10",
        11: "11",
        12: "12",
        13: "13",
        14: "14",
        15: "15",
        16: "16",
        17: "17",
        18: "18",
        19: "19",
        20: "20",
      },
    },
  },
  plugins: [],
};
