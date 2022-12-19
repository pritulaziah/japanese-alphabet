import isNumeric from "./isNumeric";

const isNumericQuery = (value: string | string[] | undefined) => {
  return typeof value === "string" && isNumeric(value);
};

export default isNumericQuery;
