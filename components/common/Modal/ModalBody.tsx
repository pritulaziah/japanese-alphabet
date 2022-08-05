interface IProps {
  children: React.ReactNode;
}

const ModalBody = ({ children }: IProps) => {
  return <div className="overflow-y-auto flex-1">{children}</div>;
};

export default ModalBody;
