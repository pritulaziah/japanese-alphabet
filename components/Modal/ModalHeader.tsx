import { useContext } from "react";
import clsx from "clsx";
import ModalContext from "./ModalContext";

interface IProps {
  children: React.ReactNode;
  className?: string;
}

const ModalHeader = ({ children, className }: IProps) => {
  const context = useContext(ModalContext);

  return (
    <div className="flex justify-between items-start p-4 rounded-t border-b dark:border-gray-600 mb-3">
      <h2 className={clsx("text-4xl", className)}>{children}</h2>
      <button
        type="button"
        onClick={() => context.onHide()}
        className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M0 0h24v24H0z" fill="none" />
          <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
        </svg>
      </button>
    </div>
  );
};

export default ModalHeader;
