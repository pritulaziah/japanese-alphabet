interface IProps {
  children: React.ReactNode;
}

const Footer = ({ children }: IProps) => {
  return (
    <div className="sticky bottom-0 left-0 space-x-6 py-4 flex items-center justify-center">
      {children}
    </div>
  );
};

export default Footer;
