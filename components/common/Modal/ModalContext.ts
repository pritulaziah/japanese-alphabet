import React from "react";

type Size = "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl";

export interface IModalContext {
  onHide: () => void;
  size: Size;
}

const ModalContext = React.createContext({} as IModalContext);

export default ModalContext;
