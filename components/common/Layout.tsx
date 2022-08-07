import StoreProvider from "providers/StoreProvider";
import { AlphabetTypes } from "types/alphabet";
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
        {children}
      </div>
    </StoreProvider>
  );
};

export default Layout;
