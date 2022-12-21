import { useEffect, useState } from "react";
import { NextPage } from "next";
import Head from "next/head";
import Layout from "components/common/Layout";
import KanaTable from "components/alphabet/KanaTable";
import StoreProvider from "providers/StoreProvider";
import AlphabetTypeList from "components/common/AlphabetTypeList";
import AlphabetFormList from "components/common/AlphabetFormList";
import { AlphabetCharacter } from "types/alphabet";
import axios from "axios";
import Spinner from "components/common/Spinner";

const IndexPage: NextPage = () => {
  const [kana, setKana] = useState<AlphabetCharacter[] | null>(null);
  const isLoading = kana == null;

  useEffect(() => {
    async function getKana() {
      try {
        const response = await axios.get<AlphabetCharacter[]>("/api/kana");
        setKana(response.data);
      } catch (error) {
        // nothing
      }
    }

    getKana();
  }, []);

  return (
    <StoreProvider>
      <Layout>
        <Head>
          <meta name="description" content="Learn japanese alphabet" />
        </Head>
        <div className="flex flex-1">
          {isLoading ? (
            <Spinner size="lg" />
          ) : (
            <>
              <KanaTable kana={kana} />
              <div className="basis-1/5 border-l border-gray-200 dark:border-gray-600 dark:bg-gray-800 p-4">
                <div className="sticky top-20 flex flex-col">
                  <AlphabetFormList />
                  <AlphabetTypeList />
                </div>
              </div>
            </>
          )}
        </div>
      </Layout>
    </StoreProvider>
  );
};

export default IndexPage;
