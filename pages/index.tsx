import Table from "components/Table";
import { NextPage } from "next";
// Взял за основу: https://gist.github.com/mdzhang/899a427eb3d0181cd762
import kana from "kana.json";
import {
  AlphabetCharacter,
  AlphabetTypes,
  AlphabetForms,
} from "types/alphabet";
import { useReducer } from "react";
import Settings from "components/Settings";
import Head from "next/head";
import Navigation from "components/Navigation";

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

const Learn: NextPage = () => {
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
    <div className="flex">
      <Head>
        <meta name="description" content="Learn japanese alphabet" />
      </Head>
      <Navigation />
      <Table
        form={state.form}
        visibleTypes={state.visibleTypes}
        alphabet={kana as AlphabetCharacter[]}
      />
      <Settings
        form={state.form}
        visibleTypes={state.visibleTypes}
        onChangeVisibleType={onChangeVisibleType}
        onChangeForm={onChangeForm}
      />
    </div>
  );
};

export default Learn;
