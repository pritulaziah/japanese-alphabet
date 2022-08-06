import { Answer } from "types/game";
import ResultItem from "./ResultItem";

interface IProps {
  answers: Answer[];
}

const ResultList = ({ answers }: IProps) => {
  return (
    <div className="min-w-[50%]">
      <h2 className="inline-block">
        <span>Счёт: </span>
        <span>{answers.filter((answer) => answer.correct).length}</span>
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
    </div>
  );
};

export default ResultList;
