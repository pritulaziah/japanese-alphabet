import KanaTable from "components/alphabet/KanaTable";
import AlphabetTypeList from "components/common/AlphabetTypeList";
import { AlphabetCharacter } from "types/alphabet";
import getAPIKana from "api/getKana";
import Spinner from "components/common/Spinner";
import { AlphabetTypes, AlphabetForms } from "types/alphabet";
import { useEffect, useState, useReducer } from "react";
import SegmentedControl from "components/common/SegmentedControl";

const formDict = Object.entries(AlphabetForms).map(([label, value]) => ({
  label,
  value,
}));

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
  const [kana, setKana] = useState<AlphabetCharacter[] | null>(null);
  const [state, dispatch] = useReducer(reducer, {
    types: Object.values(AlphabetTypes),
    form: AlphabetForms.Hiragana,
  });
  const isLoading = kana == null;

  const changeForm = (form: AlphabetForms) => {
    dispatch({ type: ActionTypes.ChangeForm, payload: form });
  };

  const changeTypes = (types: AlphabetTypes[]) => {
    dispatch({ type: ActionTypes.ChangeTypes, payload: types });
  };

  useEffect(() => {
    async function getKana() {
      try {
        const response = await getAPIKana();
        setKana(response.data);
      } catch (error) {
        // nothing
      }
    }

    getKana();
  }, []);

  return (
    <div className="flex flex-1">
      {isLoading ? (
        <Spinner size="lg" />
      ) : (
        <>
          <KanaTable kana={kana} types={state.types} form={state.form} />
          <div className="basis-1/5 border-l border-gray-200 dark:border-gray-600 dark:bg-gray-800 p-4">
            <div className="sticky top-20 flex flex-col">
              <div className="text-lg xl:text-xl pb-4 mb-4 text-center xl:text-left border-b dark:border-gray-600">
                <SegmentedControl
                  segments={formDict}
                  value={state.form}
                  onChange={(segment) =>
                    changeForm(segment.value as AlphabetForms)
                  }
                />
              </div>
              <AlphabetTypeList types={state.types} onChange={changeTypes} />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Alphabet;
