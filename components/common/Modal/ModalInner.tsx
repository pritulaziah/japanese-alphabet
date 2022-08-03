import React, { useRef, useEffect } from "react";
import getScrollbarWidth from "utils/getScrollbarWidth";

interface IProps {
  children: React.ReactNode;
  onHide: () => void;
}

const ModalInner = ({ children, onHide }: IProps) => {
  useEffect(() => {
    const handleEscapeKeyDown = ({ key }: KeyboardEvent) => {
      if (key === "Escape") {
        onHide();
      }
    };

    document.addEventListener("keydown", handleEscapeKeyDown, false);

    return () => {
      document.removeEventListener("keydown", handleEscapeKeyDown, false);
    };
  }, []);

  useEffect(() => {
    const bodyStyle = document.body.style;

    bodyStyle.paddingRight = `${getScrollbarWidth()}px`;
    bodyStyle.overflow = "hidden";

    return () => {
      bodyStyle.paddingRight = "";
      bodyStyle.overflow = "";
    };
  });

  const handleClickOutside = ({
    target,
    currentTarget,
  }: React.MouseEvent<HTMLDivElement>) => {
    if (target === currentTarget) {
      onHide();
    }
  };

  return (
    <>
      <div
        onClick={handleClickOutside}
        className="bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-40"
      />
      <div
        tabIndex={-1}
        aria-hidden="true"
        className="overflow-hidden fixed top-1/2 left-1/2 z-50 p-4 w-full max-w-md h-auto -translate-x-1/2 -translate-y-1/2"
      >
        {children}
      </div>
    </>
  );
};

export default ModalInner;
