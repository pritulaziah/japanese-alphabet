import Table from "components/japanese/Table";
import { NextPage } from "next";
// Взял за основу: https://gist.github.com/mdzhang/899a427eb3d0181cd762
import hiragana from "hiragana.json";
import { AlphabetCharacter } from "types/alphabet";
import { useReducer } from "react";

interface IProps {}

type Action = {
  type: "NOTHING";
  payload?: null;
};

function reducer(state: AlphabetCharacter[], action: Action) {
  switch (action.type) {
    default:
      return state;
  }
}

const Learn: NextPage<IProps> = () => {
  const [alphabetState, alphabetAction] = useReducer(
    reducer,
    hiragana as AlphabetCharacter[]
  );

  return (
    <div className="min-h-screen bg-gray-900 px-10 py-4">
      <Table alphabet={alphabetState} />
    </div>
  );
};

export default Learn;
