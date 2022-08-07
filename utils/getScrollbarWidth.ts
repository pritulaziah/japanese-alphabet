const getScrollbarWidth = () => {
  const window = document.defaultView!;

  return Math.abs(window.innerWidth - document.documentElement.clientWidth);
};

export default getScrollbarWidth;
