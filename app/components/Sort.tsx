import { Link, useLocation } from "@remix-run/react";
import { ChevronUp } from "lucide-react";
import { getFilterOptions } from "~/hooks/useFilterOptions";

export const Sort = () => {
  const location = useLocation();

  return (
    <div className="flex gap-2">
      <Link to={getFilterOptions("orderBy", "averageRating", location)}>
        <button type="button" className="btn-sm btn">
          Average Rating
          <ChevronUp />
        </button>
      </Link>
      <Link to={getFilterOptions("orderBy", "difficulty", location)}>
        <button type="button" className="btn-sm btn">
          Difficulty
          <ChevronUp />
        </button>
      </Link>
      <Link to={getFilterOptions("orderBy", "name", location)}>
        <button type="button" className="btn-sm btn">
          Name
          <ChevronUp />
        </button>
      </Link>
    </div>
  );
};
