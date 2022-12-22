const isNumeric = <T>(n: T) => !isNaN(parseFloat(String(n)));

export default isNumeric;
