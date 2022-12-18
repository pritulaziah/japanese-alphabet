const isNumeric = (n: string) => {
  return !isNaN(parseFloat(n));
};

export default isNumeric;
