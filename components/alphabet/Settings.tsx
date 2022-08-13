import AlphabetTypeList from "components/common/AlphabetTypeList";
import AlphabetFormList from "components/common/AlphabetFormList";

const Settings = () => {
  return (
    <div className="basis-1/5 border-l border-gray-200 dark:border-gray-600 dark:bg-gray-800 p-4">
      <div className="sticky top-20 flex flex-col">
        <AlphabetFormList />
        <AlphabetTypeList />
      </div>
    </div>
  );
};

export default Settings;
