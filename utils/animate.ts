type AnimateFunction = {
  draw: (timestamp: number) => void;
  timing?: (timeFraction: number) => number;
  duration: number;
};

const animate = (
  { timing = (timeFraction) => timeFraction, draw, duration }: AnimateFunction,
  callback?: () => void
) => {
  const requestAnimationFrame = window.requestAnimationFrame;

  if (requestAnimationFrame) {
    const start = performance.now();

    const step = (timestamp: number) => {
      let timeFraction = (timestamp - start) / duration;
      if (timeFraction < 0) timeFraction = 0;
      if (timeFraction > 1) timeFraction = 1;
      const progress = timing(timeFraction);
      draw(progress);

      if (timeFraction < 1) {
        requestAnimationFrame(step);
      } else {
        callback?.();
      }
    };

    requestAnimationFrame(step);
  } else {
    draw(1);
    callback?.();
  }
};

export default animate;
