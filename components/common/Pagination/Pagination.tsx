import { useMemo } from "react";
import PaginationButton from "./PaginationButton";
import createPagination from "components/common/Pagination/createPagination";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLeftLong, faRightLong } from "@fortawesome/free-solid-svg-icons";

interface IProps {
  currentPage: number;
  pageCount: number;
  onChangePage: () => void;
}

const Pagination = ({ currentPage, pageCount, onChangePage }: IProps) => {
  const pagination = useMemo(
    () => createPagination(currentPage, pageCount),
    []
  );

  return (
    <ul className="inline-flex -space-x-px rounded-md shadow-sm">
      <li>
        <PaginationButton className="rounded-l-md">
          <FontAwesomeIcon icon={faLeftLong} />
          <span className="ml-2">Prev</span>
        </PaginationButton>
      </li>
      {pagination.map(({ label, page, active }) => (
        <li>
          <PaginationButton active={active}>{label}</PaginationButton>
        </li>
      ))}
      <li>
        <PaginationButton className="rounded-r-lg">
          <span className="mr-2">Next</span>
          <FontAwesomeIcon icon={faRightLong} />
        </PaginationButton>
      </li>
    </ul>
  );
};

export default Pagination;
