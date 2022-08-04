import React from "react";
import ReactDOM from "react-dom";
import canUseDOM from "utils/canUseDOM";
import ModalBody from "./ModalBody";
import ModalContext from "./ModalContext";
import ModalHeader from "./ModalHeader";
import ModalInner from "./ModalInner";

interface IProps {
  show?: boolean;
  onHide: () => void;
  children: React.ReactNode;
}

const Modal = ({ show = false, onHide, children }: IProps) => {
  if (!canUseDOM) {
    return null;
  }

  if (!show) {
    return null;
  }

  return (
    <ModalContext.Provider value={{ onHide }}>
      {ReactDOM.createPortal(
        <ModalInner>{children}</ModalInner>,
        document.body
      )}
    </ModalContext.Provider>
  );
};

Modal.Body = ModalBody;
Modal.Header = ModalHeader;

export default Modal;
