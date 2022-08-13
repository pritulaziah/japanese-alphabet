import StoreProvider from "providers/StoreProvider";
import { AlphabetTypes } from "types/alphabet";
import Header from "./Header";

interface IProps {
  children: React.ReactNode;
  initialTypes?: AlphabetTypes[];
}

const Layout = ({ children, initialTypes }: IProps) => {
  return (
    <StoreProvider initialTypes={initialTypes}>
      <div className="flex flex-col min-h-screen">
        <Header />
        {children}
      </div>
    </StoreProvider>
  );
};

export default Layout;
