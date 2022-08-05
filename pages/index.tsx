import Table from "components/Table";
import { NextPage } from "next";
// Взял за основу: https://gist.github.com/mdzhang/899a427eb3d0181cd762
import kana from "kana.json";
import { AlphabetCharacter, AlphabetTypes } from "types/alphabet";
import { useReducer } from "react";
import Settings from "components/Settings";
import Head from "next/head";
import Navigation from "components/Navigation";

interface State {
  visibleTypes: AlphabetTypes[];
}

enum Types {
  ChangeTypes = "CHANGE_VISIBLE_TYPES",
}

type Action = {
  type: Types.ChangeTypes;
  payload: AlphabetTypes[];
};

const initialState: State = {
  visibleTypes: Object.values(AlphabetTypes),
};

function reducer(state: State, action: Action) {
  switch (action.type) {
    case Types.ChangeTypes:
      return {
        ...state,
        visibleTypes: action.payload,
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

  return (
    <div className="flex">
      <Head>
        <meta name="description" content="Learn japanese alphabet" />
      </Head>
      <Navigation />
      <Table
        visibleTypes={state.visibleTypes}
        alphabet={kana as AlphabetCharacter[]}
      />
      <Settings
        visibleTypes={state.visibleTypes}
        onChangeVisibleType={onChangeVisibleType}
      />
    </div>
  );
};

export default Learn;
