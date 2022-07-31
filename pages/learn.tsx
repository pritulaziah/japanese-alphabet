import Table from "components/japanese/Table";
import { NextPage } from "next";
import hiragana from "hiragana.json";

interface IProps {}

const Learn: NextPage<IProps> = () => {
  return (
    <div className="min-h-screen bg-gray-900 px-10 py-4">
      <Table alphabet={hiragana} />
    </div>
  );
};

export default Learn;
