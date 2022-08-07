import { createContext } from "react";
import { Store } from "types/store";

const StoreContext = createContext<Store>({} as Store);

export default StoreContext;
