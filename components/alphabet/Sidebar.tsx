import ThemeToggle from "components/alphabet/ThemeToggle";
import useIsMounted from "hooks/useIsMounted";
import AlphabetTypeList from "components/common/AlphabetTypeList";
import AlphabetFormList from "components/common/AlphabetFormList";

const Sidebar = () => {
  const isMounted = useIsMounted();

  return (
    <div className="relative hidden lg:block lg:basis-1/6 xl:basis-1/5">
      <div className="sticky top-0 min-h-screen shadow-sidebar p-4 bg-gray-50 dark:bg-gray-800 flex flex-col justify-between">
        <div className="flex flex-col mb-3">
          <AlphabetFormList />
          <AlphabetTypeList />
        </div>
        {isMounted && <ThemeToggle />}
      </div>
    </div>
  );
};

export default Sidebar;
