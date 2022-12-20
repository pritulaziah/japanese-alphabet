import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import Layout from "components/common/Layout";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { IWordsData } from "types/word";
import WordsTable from "components/words/WordsTable";
import { DEFAULT_LIMIT } from "constants/index";
import Pagination from "components/common/Pagination/Pagination";
import { useRouter } from "next/router";
import isNumericQuery from "utils/isNumericQuery";
import Spinner from "components/common/Spinner";
import Search from "components/common/Search";
import { ParsedUrlQuery, ParsedUrlQueryInput } from "querystring";
import throttle from "utils/throttle";
import isString from "utils/isString";
import useQueryState from "hooks/useQueryState";

type QueryWords = { page: number; search: string };

interface IProps {
  query: ParsedUrlQuery;
}

const WordsPage: NextPage<IProps> = ({ query }) => {
  const [stateQuery, setStateQuery] = useQueryState<QueryWords>({
    search: decodeURIComponent(
      isString(query.search) ? String(query.search) : ""
    ),
    page: Number(
      decodeURIComponent(isNumericQuery(query.page) ? String(query.page) : "1")
    ),
  });
  const [wordsData, setWordsData] = useState<IWordsData | null>(null);
  const [inputSearch, setInputSearch] = useState(stateQuery.search);
  const throttledSearch = useRef(throttle<[QueryWords]>(getWords, 500));
  const loadingPage = wordsData == null;

  async function getWords({ page, search }: QueryWords) {
    try {
      const response = await axios.get<IWordsData>("/api/words", {
        params: {
          limit: DEFAULT_LIMIT,
          offset: (page - 1) * DEFAULT_LIMIT,
          search: search,
        },
      });
      setWordsData(response.data);
    } catch (error) {
      // nothing
    }
  }

  useEffect(() => {
    throttledSearch.current({
      page: stateQuery.page,
      search: stateQuery.search,
    });
  }, [stateQuery]);

  let content: React.ReactNode = null;

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
      setStateQuery({ page });
    };

    const onChangeSearchValue = (value: string) => {
      setStateQuery({ page: 1, search: value });
      setInputSearch(value);
    };

    content = (
      <div className="p-4">
        <Search value={inputSearch} onChange={onChangeSearchValue} />
        <WordsTable data={data} />
        {pageCount > 1 && (
          <div className="flex justify-center mt-8">
            <Pagination
              pageCount={pageCount}
              currentPage={stateQuery.page}
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

export const getServerSideProps: GetServerSideProps<IProps> = async (
  context
) => {
  return {
    props: { query: context.query },
  };
};

export default WordsPage;
