import Table from "components/alphabet/Table";
import kana from "kana.json";
import {
  AlphabetCharacter,
  AlphabetTypes,
  AlphabetForms,
} from "types/alphabet";
import { useReducer } from "react";
import Settings from "components/alphabet/Settings";

interface State {
  visibleTypes: AlphabetTypes[];
  form: AlphabetForms;
}

enum Types {
  ChangeTypes = "CHANGE_VISIBLE_TYPES",
  ChangeForm = "CHANGE_FORM",
}

type Action =
  | { type: Types.ChangeTypes; payload: AlphabetTypes[] }
  | { type: Types.ChangeForm; payload: AlphabetForms };

const initialState: State = {
  visibleTypes: Object.values(AlphabetTypes),
  form: AlphabetForms.Hiragana,
};

function reducer(state: State, action: Action) {
  switch (action.type) {
    case Types.ChangeTypes:
      return {
        ...state,
        visibleTypes: action.payload,
      };
    case Types.ChangeForm:
      return {
        ...state,
        form: action.payload,
      };
    default:
      return state;
  }
}

const Alphabet = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const onChangeVisibleType = (type: AlphabetTypes) => {
    const prevVisibleTypes = new Set(state.visibleTypes);
    if (prevVisibleTypes.has(type)) {
      prevVisibleTypes.delete(type);
    } else {
      prevVisibleTypes.add(type);
    }

    dispatch({ type: Types.ChangeTypes, payload: [...prevVisibleTypes] });
  };

  const onChangeForm = (type: AlphabetForms) => {
    dispatch({ type: Types.ChangeForm, payload: type });
  };

  return (
    <>
      <Table
        form={state.form}
        visibleTypes={state.visibleTypes}
        alphabet={kana as unknown as AlphabetCharacter[]}
      />
      <Settings
        form={state.form}
        visibleTypes={state.visibleTypes}
        onChangeVisibleType={onChangeVisibleType}
        onChangeForm={onChangeForm}
      />
    </>
  );
};

export default Alphabet;
