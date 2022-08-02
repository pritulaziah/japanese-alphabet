import canUseDOM from "./canUseDOM";

const checkSupportLocalStorage = () => {
  try {
    return (
      canUseDOM && "localStorage" in window && window.localStorage !== null
    );
  } catch (e) {
    return false;
  }
};

const getLocalStorage = () =>
  checkSupportLocalStorage() ? window.localStorage : null;

export default getLocalStorage;
