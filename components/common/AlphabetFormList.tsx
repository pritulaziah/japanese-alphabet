import useStore from "hooks/useStore";
import { ActionTypes } from "types/store";
import { AlphabetForms } from "types/alphabet";
import SegmentedControl from "./SegmentedControl";

const formDict = Object.entries(AlphabetForms).map(([label, value]) => ({
  label,
  value,
}));

const AlphabetFormList = () => {
  const { state, dispatch } = useStore();
  const { form } = state;

  const onChangeForm = (type: AlphabetForms) => {
    dispatch({ type: ActionTypes.ChangeForm, payload: type });
  };

  return (
    <div className="text-lg xl:text-xl pb-4 mb-4 text-center xl:text-left border-b dark:border-gray-600">
      <SegmentedControl
        segments={formDict}
        value={form}
        onChange={(segment) => onChangeForm(segment.value as AlphabetForms)}
      />
    </div>
  );
};

export default AlphabetFormList;
