import Header from "./Header";

interface IProps {
  children: React.ReactNode;
}

const Layout = ({ children }: IProps) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      {children}
    </div>
  );
};

export default Layout;
