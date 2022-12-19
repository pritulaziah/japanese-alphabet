import { NextPage } from "next";
import Head from "next/head";
import Layout from "components/common/Layout";
import { useEffect, useState } from "react";
import axios from "axios";
import { IWordsData } from "types/word";
import WordsTable from "components/words/WordsTable";
import { DEFAULT_LIMIT } from "constants/index";
import Pagination from "components/common/Pagination/Pagination";
import { useRouter } from "next/router";
import isNumericQuery from "utils/isNumericQuery";
import Spinner from "components/common/Spinner";

const WordsPage: NextPage = () => {
  const router = useRouter();
  const { page } = router.query;
  const pageNum = isNumericQuery(page) ? Number(page) : 1;
  const [wordsData, setWordsData] = useState<IWordsData | null>(null);
  const loadingPage = wordsData == null;

  useEffect(() => {
    const getWords = async () => {
      try {
        const response = await axios<IWordsData>(
          `/api/words?limit=${DEFAULT_LIMIT}&offset=${pageNum * DEFAULT_LIMIT}`
        );
        setWordsData(response.data);
      } catch (error) {
        // nothing
      }
    };

    getWords();
  }, [pageNum]);

  let content = null;

  if (loadingPage) {
    content = (
      <div className="flex flex-1 justify-center items-center">
        <Spinner size="lg" />
      </div>
    );
  } else {
    const { data, count } = wordsData!;
    const pageCount = Math.floor(count / DEFAULT_LIMIT);

    const onChangePage = (page: number) => {
      console.log(page);
      router.push({ query: { page } }, undefined, {
        shallow: true,
      });
    };

    content = (
      <div className="p-4">
        <WordsTable data={data} />
        {pageCount > 1 && (
          <div className="flex justify-center mt-8">
            <Pagination
              pageCount={pageCount}
              currentPage={pageNum}
              onChangePage={onChangePage}
            />
          </div>
        )}
      </div>
    );
  }

  return (
    <Layout>
      <Head>
        <meta name="description" content="Japanese words" />
      </Head>
      {content}
    </Layout>
  );
};

export default WordsPage;
