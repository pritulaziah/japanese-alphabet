import StoreProvider from "providers/StoreProvider";
import Sidebar from "./Sidebar";
import Navigation from "./Navigation";

interface IProps {
  children: React.ReactNode;
}

const Layout = ({ children }: IProps) => {
  return (
    <StoreProvider>
      <div className="flex">
        <Navigation />
        <div className="flex-1 flex flex-col">{children}</div>
        <Sidebar />
      </div>
    </StoreProvider>
  );
};

export default Layout;
