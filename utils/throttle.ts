export default <Args extends any[]>(f: (...args: Args) => void, ms: number) => {
  let timer: number | null = null;
  let savedArgs: Args | null = null;

  const wrapper = (...args: Args) => {
    if (timer) {
      savedArgs = args;
      return;
    }

    f(...args);

    timer = window.setTimeout(() => {
      timer = null;
      if (savedArgs != null) {
        wrapper(...savedArgs);
        savedArgs = null;
      }
    }, ms);
  };

  return wrapper;
};
