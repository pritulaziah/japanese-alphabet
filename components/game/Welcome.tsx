import Footer from "./Footer";
import Button from "components/common/Button";

interface IProps {
  startGame: () => void;
}

const Welcome = ({ startGame }: IProps) => {
  return (
    <>
      <h3 className="font-medium text-lg">Настройки</h3>
      <Footer>
        <Button size="lg" rounded onClick={startGame}>
          Начать игру
        </Button>
      </Footer>
    </>
  );
};

export default Welcome;
