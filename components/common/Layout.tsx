import Navigation from "components/Navigation";

interface IProps {
  children: React.ReactNode;
}

const Layout = ({ children }: IProps) => {
  return (
    <div className="flex">
      <Navigation />
      {children}
    </div>
  );
};

export default Layout;
