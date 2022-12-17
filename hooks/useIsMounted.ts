import { useState, useRef, useEffect } from "react";

const useIsMounted = () => {
  const isMountedRef = useRef(false);
  const [, setIsMounted] = useState(false);

  useEffect(() => {
    isMountedRef.current = true;
    setIsMounted(true);

    return () => {
      isMountedRef.current = false;
    };
  }, []);

  return isMountedRef.current;
};

export default useIsMounted;
