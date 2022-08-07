import StoreProvider from "providers/StoreProvider";
import { AlphabetTypes } from "types/alphabet";
import Sidebar from "./Sidebar";
import Navigation from "./Navigation";

interface IProps {
  children: React.ReactNode;
  initialTypes?: AlphabetTypes[];
}

const Layout = ({ children, initialTypes }: IProps) => {
  return (
    <StoreProvider initialTypes={initialTypes}>
      <div className="flex">
        <Navigation />
        <div className="flex-1 flex flex-col">{children}</div>
        <Sidebar />
      </div>
    </StoreProvider>
  );
};

export default Layout;
