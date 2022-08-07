import { useContext } from "react";
import StoreContext from "contexts/StoreContext";

const useStore = () => {
  const context = useContext(StoreContext);

  return context;
};

export default useStore;
