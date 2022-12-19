import { useMemo } from "react";
import PaginationButton from "./PaginationButton";
import createPagination from "components/common/Pagination/createPagination";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLeftLong, faRightLong } from "@fortawesome/free-solid-svg-icons";

interface IProps {
  currentPage: number;
  pageCount: number;
  onChangePage: (page: number) => void;
}

const Pagination = ({ currentPage, pageCount, onChangePage }: IProps) => {
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === pageCount;
  const pagination = useMemo(
    () => createPagination(currentPage, pageCount),
    [currentPage, pageCount]
  );

  const handleChangePage = (page: number | null) => {
    if (typeof page === "number") {
      onChangePage(page);
    }
  };

  return (
    <ul className="inline-flex -space-x-px rounded-md shadow-sm">
      <li>
        <PaginationButton
          className="rounded-l-md"
          onClick={
            isFirstPage ? undefined : () => handleChangePage(currentPage - 1)
          }
          disabled={isFirstPage}
        >
          <FontAwesomeIcon icon={faLeftLong} />
          <span className="ml-2">Prev</span>
        </PaginationButton>
      </li>
      {pagination.map(({ label, page, active }) => (
        <li key={page}>
          <PaginationButton
            active={active}
            onClick={
              page === currentPage ? undefined : () => handleChangePage(page)
            }
          >
            {label}
          </PaginationButton>
        </li>
      ))}
      <li>
        <PaginationButton
          className="rounded-r-lg"
          onClick={
            isLastPage ? undefined : () => handleChangePage(currentPage + 1)
          }
          disabled={isLastPage}
        >
          <span className="mr-2">Next</span>
          <FontAwesomeIcon icon={faRightLong} />
        </PaginationButton>
      </li>
    </ul>
  );
};

export default Pagination;
