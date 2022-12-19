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

  return (
    <ul className="inline-flex -space-x-px rounded-md shadow-sm">
      <li>
        <PaginationButton
          className="rounded-l-md"
          onClick={
            isFirstPage ? undefined : () => onChangePage(currentPage - 1)
          }
          disabled={isFirstPage}
        >
          <FontAwesomeIcon icon={faLeftLong} />
          <span className="ml-2">Prev</span>
        </PaginationButton>
      </li>
      {pagination.map(({ label, page }) => (
        <li key={page}>
          <PaginationButton
            active={page === currentPage}
            onClick={
              page === currentPage ? undefined : () => onChangePage(page)
            }
          >
            {label}
          </PaginationButton>
        </li>
      ))}
      <li>
        <PaginationButton
          className="rounded-r-lg"
          onClick={isLastPage ? undefined : () => onChangePage(currentPage + 1)}
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
