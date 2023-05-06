import KanaTable from "components/alphabet/KanaTable";
import AlphabetTypeList from "components/common/AlphabetTypeList";
import { AlphabetCharacter } from "types/alphabet";
import { AlphabetTypes, AlphabetForms } from "types/alphabet";
import { useReducer } from "react";
import SegmentedControl from "components/common/SegmentedControl";
import alphabetForms from "constants/alphabetForms";
import kana from "../../kana.json";

interface State {
  types: AlphabetTypes[];
  form: AlphabetForms;
}

enum ActionTypes {
  ChangeTypes = "CHANGE_TYPES",
  ChangeForm = "CHANGE_FORM",
}

type Action =
  | { type: ActionTypes.ChangeTypes; payload: AlphabetTypes[] }
  | { type: ActionTypes.ChangeForm; payload: AlphabetForms };

function reducer(state: State, action: Action) {
  switch (action.type) {
    case ActionTypes.ChangeTypes:
      return {
        ...state,
        types: action.payload,
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

const Alphabet = () => {
  const [state, dispatch] = useReducer(reducer, {
    types: Object.values(AlphabetTypes),
    form: AlphabetForms.Hiragana,
  });

  const changeForm = (form: AlphabetForms) => {
    dispatch({ type: ActionTypes.ChangeForm, payload: form });
  };

  const changeTypes = (types: AlphabetTypes[]) => {
    dispatch({ type: ActionTypes.ChangeTypes, payload: types });
  };

  return (
    <div className="flex flex-1">
      <KanaTable
        kana={kana as unknown as AlphabetCharacter[]}
        types={state.types}
        form={state.form}
      />
      <div className="basis-1/5 border-l border-gray-200 dark:border-gray-600 dark:bg-gray-800 p-4">
        <div className="sticky top-20 flex flex-col">
          <div className="text-lg xl:text-xl pb-4 mb-4 text-center xl:text-left border-b dark:border-gray-600">
            <SegmentedControl
              segments={alphabetForms}
              value={state.form}
              onChange={(segment) => changeForm(segment.value as AlphabetForms)}
            />
          </div>
          <AlphabetTypeList types={state.types} onChange={changeTypes} />
        </div>
      </div>
    </div>
  );
};

export default Alphabet;
