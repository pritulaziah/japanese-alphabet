import clsx from "clsx";
import { useEffect, useRef } from "react";
import animate from "utils/animate";

const getProgressStrokeStyle = (progress: number) => {
  if (progress <= 25) {
    return "stroke-red-500";
  } else if (progress <= 60) {
    return "stroke-yellow-500";
  } else {
    return "stroke-green-500";
  }
};

interface IProps {
  progress: number;
}

const CircleProgress = ({ progress }: IProps) => {
  const progressCircleRef = useRef<SVGCircleElement>(null);
  progress = Math.min(Math.max(0, progress), 100);
  const size = 100;
  const strokeWidth = 10;
  const center = size / 2;
  const radius = center - strokeWidth;
  const dashArray = 2 * Math.PI * radius;
  const dashOffset = dashArray * ((100 - progress) / 100);

  useEffect(() => {
    const { current: progressCircle } = progressCircleRef;

    if (progressCircle) {
      animate({
        duration: 1000,
        draw: (progress) => {
          progressCircle.style.strokeDashoffset = `${
            dashArray - (dashArray - dashOffset) * progress
          }px`;
        },
      });
    }
  }, []);

  return (
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
          getProgressStrokeStyle(progress),
          "fill-transparent -rotate-90 origin-center"
        )}
        ref={progressCircleRef}
        cx={center}
        cy={center}
        r={radius}
        strokeWidth={`${strokeWidth}px`}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray={`${dashArray}px`}
      />
      <text
        className="font-semibold dark:fill-white"
        x="50%"
        y="50%"
        dy="0.3rem"
        textAnchor="middle"
      >
        {`${progress}%`}
      </text>
    </svg>
  );
};

export default CircleProgress;
