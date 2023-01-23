interface IProps {
  children: React.ReactNode;
}

const ModalFooter = ({ children }: IProps) => {
  return (
    <div className="sticky bottom-0 border-t dark:border-gray-600 mt-3 pt-3 flex justify-end space-x-4">
      {children}
    </div>
  );
};

export default ModalFooter;
