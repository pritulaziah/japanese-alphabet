import { useEffect, useState, useRef } from "react";
import { getAPIWords, IWordsData } from "pages/api/words";
import Table, { IColumn } from "components/common/Table";
import { DEFAULT_LIMIT } from "constants/index";
import Pagination from "components/common/Pagination/Pagination";
import isNumericQuery from "utils/isNumericQuery";
import Spinner from "components/common/Spinner";
import Search from "components/common/Search";
import { ParsedUrlQuery } from "querystring";
import throttle from "utils/throttle";
import isString from "utils/isString";
import useQueryState from "hooks/useQueryState";
import { IWord } from "types/word";

const columns: IColumn<IWord>[] = [
  {
    accessor: "japanese",
    header: "Japanese",
    render: (data) => (
      <span className="japanese text-lg font-medium text-gray-900 whitespace-nowrap dark:text-white">
        {data["japanese"]}
      </span>
    ),
    width: "30%",
  },
  {
    accessor: "romaji",
    header: "Romaji",
  },
  {
    accessor: "meaning",
    header: "Meaning",
    width: "40%",
  },
];

type QueryWords = { page: number; search: string };

interface IProps {
  query: ParsedUrlQuery;
}

const Words = ({ query }: IProps) => {
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
      const response = await getAPIWords({
        search,
        offset: (page - 1) * DEFAULT_LIMIT,
      });
      setWordsData(response.data);
    } catch (error) {}
  }

  useEffect(() => {
    throttledSearch.current({
      page: stateQuery.page,
      search: stateQuery.search,
    });
  }, [stateQuery]);

  if (loadingPage) {
    return (
      <div className="flex flex-1 justify-center items-center">
        <Spinner size="lg" />
      </div>
    );
  } else {
    const { data, count } = wordsData;
    const pageCount = Math.ceil(count / DEFAULT_LIMIT);

    const onChangePage = (page: number) => {
      setStateQuery({ page });
    };

    const onChangeSearchValue = (value: string) => {
      setStateQuery({ page: 1, search: value });
      setInputSearch(value);
    };

    return (
      <div className="p-4">
        <Search value={inputSearch} onChange={onChangeSearchValue} />
        <Table data={data} columns={columns} />
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
};

export default Words;
