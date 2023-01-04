import { AlphabetForms, AlphabetTypes } from "types/alphabet";
import Button from "components/common/Button";
import AlphabetTypeList from "components/common/AlphabetTypeList";
import ButtonGroup from "components/common/ButtonGroup";
import Footer from "./Footer";
import alphabetForms from "constants/alphabetForms";

const questionCounts = [10, 15, 20, 25, 30];
const questionCountDict = questionCounts.map((questionCount) => ({
  label: String(questionCount),
  value: questionCount,
}));

interface IProps {
  startGame: () => void;
  currentQuestionCount: number;
  changeQuestionCount: (count: number) => void;
  form: AlphabetForms;
  changeForm: (form: AlphabetForms) => void;
  types: AlphabetTypes[];
  changeTypes: (types: AlphabetTypes[]) => void;
}

const Start = ({
  startGame,
  currentQuestionCount,
  changeQuestionCount,
  changeTypes,
  form,
  changeForm,
  types,
}: IProps) => {
  const disabled = types.length === 0;

  const renderLabel = (text: string) => (
    <div className="mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
      {text}:
    </div>
  );

  return (
    <>
      <div className="flex flex-col mb-2">
        <h3 className="font-medium text-lg mb-4">Настройки</h3>
        <ButtonGroup
          collection={alphabetForms}
          current={form}
          onChange={changeForm}
        />
        <div className="flex flex-col my-5">
          <div>
            {renderLabel("Тип")}
            <AlphabetTypeList
              types={types}
              onChange={changeTypes}
              mode="checkbox"
              hidden={[AlphabetTypes.Sokuon]}
            />
          </div>
        </div>
        <div className="flex flex-col">
          <div className="mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
            {renderLabel("Количество вопросов")}
          </div>
          <ButtonGroup
            collection={questionCountDict}
            current={currentQuestionCount}
            onChange={changeQuestionCount}
          />
        </div>
      </div>
      <Footer>
        <Button
          size="lg"
          rounded
          onClick={disabled ? undefined : startGame}
          disabled={disabled}
        >
          Начать игру
        </Button>
      </Footer>
    </>
  );
};

export default Start;
