import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { ParsedUrlQueryInput } from "querystring";

const useQueryState = <T extends { [key: string]: string | number | boolean }>(
  initialState: T
): [T, (queries: Partial<T>) => void] => {
  const router = useRouter();
  const [queryState, setQueryState] = useState<T>(initialState);

  const changeQueryState = useCallback((queries: Partial<T>) => {
    setQueryState((prevState) => ({ ...prevState, ...queries }));
  }, []);

  useEffect(() => {
    const newQueryState: ParsedUrlQueryInput = {};

    for (const key in queryState) {
      newQueryState[key] = encodeURIComponent(queryState[key]);
    }

    router.push({ query: newQueryState }, undefined, {
      shallow: true,
    });
  }, [queryState]);

  return [queryState, changeQueryState];
};

export default useQueryState;
