import React from "react";
import ReactDOM from "react-dom";
import canUseDOM from "utils/canUseDOM";
import ModalBody from "./ModalBody";
import ModalContext, { IModalContext } from "./ModalContext";
import ModalFooter from "./ModalFootet";
import ModalHeader from "./ModalHeader";
import ModalInner from "./ModalInner";
import useModal from "./useModal";

interface IProps {
  show?: boolean;
  onHide: () => void;
  children: React.ReactNode;
  size?: IModalContext["size"];
}

const Modal = ({ show = false, onHide, children, size = "md" }: IProps) => {
  if (!canUseDOM || !show) {
    return null;
  }

  const value: IModalContext = { onHide, size };

  return (
    <ModalContext.Provider value={value}>
      {ReactDOM.createPortal(
        <ModalInner>{children}</ModalInner>,
        document.body
      )}
    </ModalContext.Provider>
  );
};

Modal.Body = ModalBody;
Modal.Header = ModalHeader;
Modal.Footer = ModalFooter;
Modal.Context = ModalContext;
Modal.useModal = useModal;

export default Modal;
