import React, { useContext, useEffect } from "react";
import getScrollbarWidth from "utils/getScrollbarWidth";
import ModalContext from "./ModalContext";

interface IProps {
  children: React.ReactNode;
}

const ModalInner = ({ children }: IProps) => {
  const context = useContext(ModalContext);

  useEffect(() => {
    const handleEscapeKeyDown = ({ key }: KeyboardEvent) => {
      if (key === "Escape") {
        context.onHide();
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
      context.onHide();
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
        className="overflow-hidden fixed top-0 md:top-1/2 left-0 md:left-1/2 z-50 p-4 w-full md:max-w-md h-full md:h-4/5 md:-translate-x-1/2 md:-translate-y-1/2 bg-white h-full rounded-lg shadow dark:bg-gray-700 p-4 flex flex-col"
      >
        {children}
      </div>
    </>
  );
};

export default ModalInner;
