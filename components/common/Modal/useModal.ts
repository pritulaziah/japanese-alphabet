import { useCallback, useState } from "react";

const useModal = <T>() => {
  const [info, setInfo] = useState<{
    action: "idle" | "create" | "update";
    data?: T | null;
  }>({ action: "idle", data: null });

  const create = useCallback(() => setInfo({ action: "create" }), []);
  const close = useCallback(() => setInfo({ action: "idle", data: null }), []);
  const update = useCallback(
    (data: T) =>
      setInfo({
        action: "update",
        data,
      }),
    []
  );

  return { info, create, update, close };
};

export default useModal;
