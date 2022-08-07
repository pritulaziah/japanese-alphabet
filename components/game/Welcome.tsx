import Button from "components/common/Button";
import AlphabetTypeList from "components/common/AlphabetTypeList";
import useStore from "hooks/useStore";
import { AlphabetTypes } from "types/alphabet";
import Footer from "./Footer";

interface IProps {
  startGame: () => void;
}

const Welcome = ({ startGame }: IProps) => {
  const { state } = useStore();

  return (
    <>
      <div className="flex flex-col">
        <h3 className="font-medium text-lg mb-2">Настройки</h3>
        <AlphabetTypeList mode="checkbox" hidden={[AlphabetTypes.Sokuon]} />
      </div>
      <Footer>
        <Button
          size="lg"
          rounded
          onClick={startGame}
          disabled={state.visibleTypes.length === 0}
        >
          Начать игру
        </Button>
      </Footer>
    </>
  );
};

export default Welcome;