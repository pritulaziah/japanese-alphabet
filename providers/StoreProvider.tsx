import { useMemo, useReducer } from "react";
import StoreContext from "contexts/StoreContext";
import { AlphabetTypes, AlphabetForms } from "types/alphabet";
import { State, Action, ActionTypes } from "types/store";

interface StoreProviderProps {
  children: React.ReactNode;
  initialTypes?: AlphabetTypes[];
}

const getInitialState = (
  initialTypes?: StoreProviderProps["initialTypes"]
): State => ({
  visibleTypes: initialTypes || Object.values(AlphabetTypes),
  form: AlphabetForms.Hiragana,
});

function reducer(state: State, action: Action) {
  switch (action.type) {
    case ActionTypes.ChangeTypes:
      return {
        ...state,
        visibleTypes: action.payload,
      };
    case ActionTypes.ChangeForm:
      return {
        ...state,
        form: action.payload,
      };
    default:
      return state;
  }
}

const StoreProvider = ({ children, initialTypes }: StoreProviderProps) => {
  const [state, dispatch] = useReducer(reducer, getInitialState(initialTypes));

  const value = useMemo(() => {
    return { state, dispatch };
  }, [state]);

  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
};

export default StoreProvider;
