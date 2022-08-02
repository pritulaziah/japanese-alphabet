import Table from "components/common/Table";
import { NextPage } from "next";
// Взял за основу: https://gist.github.com/mdzhang/899a427eb3d0181cd762
import hiragana from "hiragana.json";
import { AlphabetCharacter, AlphabetTypes } from "types/alphabet";
import { useReducer } from "react";
import Settings from "components/common/Settings";
import Head from "next/head";
import Navigation from "components/common/Navigation";

interface IProps {}

interface State {
  alphabet: AlphabetCharacter[];
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
  alphabet: hiragana as AlphabetCharacter[],
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

const Learn: NextPage<IProps> = ({}) => {
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
        <title>Japanese alphabet</title>
        <meta name="description" content="Learn japanese alphabet" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
      </Head>
      <Navigation />
      <Table visibleTypes={state.visibleTypes} alphabet={state.alphabet} />
      <Settings
        visibleTypes={state.visibleTypes}
        onChangeVisibleType={onChangeVisibleType}
      />
    </div>
  );
};

export default Learn;
