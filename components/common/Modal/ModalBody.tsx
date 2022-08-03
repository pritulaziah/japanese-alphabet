interface IProps {
  children: React.ReactNode;
}

const ModalBody = ({ children }: IProps) => {
  return (
    <div className="bg-white rounded-lg shadow dark:bg-gray-700 p-4">
      {children}
    </div>
  );
};

export default ModalBody;
