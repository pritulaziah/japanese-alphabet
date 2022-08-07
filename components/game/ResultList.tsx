import { Answer } from "types/game";
import ResultItem from "./ResultItem";
import Button from "components/common/Button";

interface IProps {
  answers: Answer[];
}

const ResultList = ({ answers }: IProps) => {
  return (
    <div>
      <div className="flex flex-col min-w-[50%]">
        <h2 className="inline-block">
          <span>Счёт: </span>
          <span>
            {answers.filter((answer) => answer.value === "correct").length}
          </span>
          <span> / </span>
          <span>{answers.length}</span>
        </h2>
        <div>
          <ul className="list-none divide-y">
            {answers.map((answer, index) => (
              <ResultItem key={index} answer={answer} />
            ))}
          </ul>
        </div>
        <div></div>
      </div>
      <div>
        <Button>Завершить</Button>
      </div>
    </div>
  );
};

export default ResultList;