import { Link, useLocation } from "@remix-run/react";
import { ChevronUp } from "lucide-react";
import { getFilterOptions } from "~/hooks/useFilterOptions";

export const Sort = () => {
  const location = useLocation();

  return (
    <div className="btn-group">
      <Link
        role="button"
        className="gap-2 btn btn-sm justify-between flex"
        to={getFilterOptions("orderBy", "averageRating", location)}
      >
        Rating
        <ChevronUp className="h-6 w-6" />
      </Link>
      <Link
        role="button"
        className="gap-2 btn btn-sm justify-between flex"
        to={getFilterOptions("orderBy", "difficulty", location)}
      >
        Difficulty
        <ChevronUp className="h-6 w-6" />
      </Link>
      <Link
        role="button"
        className="gap-2 btn btn-sm justify-between flex"
        to={getFilterOptions("orderBy", "name", location)}
      >
        Name
        <ChevronUp className="h-6 w-6" />
      </Link>
    </div>
  );
};
