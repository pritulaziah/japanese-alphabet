import React from "react";
import ReactDOM from "react-dom";
import canUseDOM from "utils/canUseDOM";
import ModalBody from "./ModalBody";
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
    <>
      {ReactDOM.createPortal(
        <ModalInner onHide={onHide}>{children}</ModalInner>,
        document.body
      )}
    </>
  );
};

Modal.Body = ModalBody;

export default Modal;
