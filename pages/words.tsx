import { NextPage } from "next";
import Head from "next/head";
import Layout from "components/common/Layout";
import { useEffect, useState } from "react";
import axios from "axios";
import { IWord } from "types/word";
import WordsTable from "components/words/WordsTable";
import { DEFAULT_LIMIT } from "constants/index";
import Pagination from "components/common/Pagination/Pagination";
import { useRouter } from "next/router";
import isNumericQuery from "utils/isNumericQuery";
import Spinner from "components/common/Spinner";

const WordsPage: NextPage = () => {
  const router = useRouter();
  const { page } = router.query;
  const pageNum = isNumericQuery(page) ? Number(page) : 0;
  const [isLoading, setIsLoading] = useState(true);
  const [words, setWords] = useState<IWord[]>([]);

  useEffect(() => {
    const getWords = async () => {
      setIsLoading(true);
      try {
        const response = await axios<{ words: IWord[] }>(
          `/api/words?limit=${DEFAULT_LIMIT}`
        );
        const { words } = response.data;
        setWords(words);
      } catch (error) {
        // nothing
      } finally {
        setIsLoading(false);
      }
    };

    getWords();
  }, []);

  const onChangePage = () => {};

  return (
    <Layout>
      <Head>
        <meta name="description" content="Japanese words" />
      </Head>
      {isLoading ? (
        <div className="flex flex-1 justify-center items-center">
          <Spinner size="lg" />
        </div>
      ) : (
        <div className="p-4">
          <div className="mb-8">
            <WordsTable data={words} />
          </div>
          <div className="flex justify-center">
            <Pagination
              pageCount={10}
              currentPage={1}
              onChangePage={onChangePage}
            />
          </div>
        </div>
      )}
    </Layout>
  );
};

export default WordsPage;
