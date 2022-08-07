import { Answer } from "types/game";
import ResultListItem from "./ResultListItem";
import Button from "components/common/Button";
import Footer from "./Footer";
import clsx from "clsx";

// TODO: поиграться с цветами

const getProgressStyle = (progress: number) => {
  if (progress <= 25) {
    return "stroke-red-500";
  } else if (progress <= 60) {
    return "stroke-yellow-500";
  } else {
    return "stroke-green-500";
  }
};

interface IProps {
  answers: Answer[];
  finishGame: () => void;
}

const ResultList = ({ answers, finishGame }: IProps) => {
  const correctAnswers = answers.filter(
    (answer) => answer.value === "correct"
  ).length;
  const progress =
    correctAnswers === 0
      ? 0
      : Math.round((correctAnswers / answers.length) * 100);
  const size = 100;
  const strokeWidth = 10;
  const center = size / 2;
  const radius = center - strokeWidth;
  const dashArray = 2 * Math.PI * radius;
  const dashOffset = dashArray * ((100 - progress) / 100);

  return (
    <>
      <div className="w-full max-w-[50%] mt-20">
        <div className="flex justify-between items-center">
          <svg style={{ width: size, height: size }}>
            <circle
              className="stroke-gray-200 fill-transparent"
              cx={center}
              cy={center}
              r={radius}
              strokeWidth={`${strokeWidth}px`}
            />
            <circle
              className={clsx(
                getProgressStyle(progress),
                "fill-transparent -rotate-90 origin-center"
              )}
              cx={center}
              cy={center}
              r={radius}
              strokeWidth={`${strokeWidth}px`}
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{
                strokeDasharray: `${dashArray}px`,
                strokeDashoffset: `${dashOffset}px`,
              }}
            />
            <text
              className="font-semibold"
              x="50%"
              y="50%"
              dy="0.3rem"
              textAnchor="middle"
            >
              {`${progress}%`}
            </text>
          </svg>
          <span className="text-lg">
            <span className="font-medium text-slate-700">Счёт:</span>{" "}
            <span className="text-xl font-semibold">{correctAnswers}</span>
            <span> / </span>
            <span>{answers.length}</span>
          </span>
        </div>
        <ul className="list-none divide-y">
          {answers.map((answer, index) => (
            <ResultListItem key={index} answer={answer} />
          ))}
        </ul>
      </div>
      <Footer>
        <Button onClick={finishGame}>Завершить</Button>
      </Footer>
    </>
  );
};

export default ResultList;
