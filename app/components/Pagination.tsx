import type { UsePaginationProps } from "react-instantsearch-hooks-web";
import { usePagination } from "react-instantsearch-hooks-web";

export const Pagination = (props: UsePaginationProps) => {
  const { pages, currentRefinement, refine } = usePagination(props);

  return (
    <div className="btn-group">
      {pages.map((page) => (
        <button
          aria-describedby="pagination"
          title={`Page ${page}`}
          onClick={() => refine(page)}
          key={page}
          className={`btn ${page === currentRefinement && "btn-active"}`}
        >
          {page + 1}
        </button>
      ))}
    </div>
  );
};
