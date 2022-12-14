import isNumeric from "./isNumeric";
import isString from "./isString";

const isNumericQuery = (value: string | string[] | undefined) => {
  return value !== undefined && isString(value) && isNumeric(value);
};

export default isNumericQuery;
