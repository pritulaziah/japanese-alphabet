import clsx from "clsx";
import React, { useRef, useState, useEffect } from "react";

type Segment = {
  label: string;
  value: string;
};

interface IProps {
  defaultIndex?: number;
  segments: Segment[];
  onChange?: () => void;
  value?: Segment["value"];
}

const SegmentedControl = ({ segments, value, onChange }: IProps) => {
  const highlightRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(() => {
    if (value) {
      const idx = segments.findIndex((segment) => segment.value === value);

      if (idx !== -1) {
        return idx;
      }
    }

    return 0;
  });

  const segmentsRef = useRef<React.RefObject<HTMLLabelElement>[]>(
    segments.map(() => React.createRef<HTMLLabelElement>())
  );

  const handleChange = (index: number) => {
    setActiveIndex(index);
  };

  useEffect(() => {
    const { current: activeSegment } = segmentsRef.current[activeIndex];

    if (activeSegment) {
      const { offsetWidth, offsetLeft } = activeSegment;
      document.documentElement.style.setProperty(
        "--highlight-width",
        `${offsetWidth}px`
      );
      document.documentElement.style.setProperty(
        "--highlight-x-pos",
        `${offsetLeft}px`
      );
    }
  }, [activeIndex, segments]);

  return (
    <div className="flex p-0.5 shadow bg-white dark:bg-gray-700 overflow-hidden rounded">
      <div className="relative inline-flex w-full justify-between">
        <div
          ref={highlightRef}
          className="absolute bg-blue-700 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 rounded h-full left-0 top-0 z-0 p-1.5 transition-all duration-300"
          style={{
            width: "var(--highlight-width)",
            transform: "translateX(var(--highlight-x-pos))",
          }}
        />
        {segments.map((segment, index) => (
          <label
            key={segment.value}
            className={clsx(
              "relative flex-1 h-full p-2 transition-color duration-300",
              index === activeIndex && "text-white"
            )}
            ref={segmentsRef.current[index]}
          >
            <input
              type="radio"
              value={segment.value}
              id={segment.label}
              onChange={() => handleChange(index)}
              checked={index === activeIndex}
              className="absolute top-0 left-0 opacity-0 pointer-events-none w-0 h-0"
            />
            <div className="blue-500 flex items-center justify-center cursor-pointer">
              {segment.label}
            </div>
          </label>
        ))}
      </div>
    </div>
  );
};

export default SegmentedControl;
