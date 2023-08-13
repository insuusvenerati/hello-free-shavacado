import { Link, useLocation, useSearchParams } from "@remix-run/react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState, type ReactNode } from "react";
import { getFilterOptions } from "~/hooks/useFilterOptions";

const sortOptions = [
  {
    orderBy: "averageRating",
    label: "Rating",
  },
  {
    orderBy: "difficulty",
    label: "Difficulty",
  },
  {
    orderBy: "name",
    label: "Name",
  },
];

const ChevronButtonLink = ({ orderBy, children }: { orderBy: string; children: ReactNode }) => {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const searchDirection = searchParams.get("direction");
  const [direction, setDirection] = useState(searchDirection || "desc");
  return (
    <Link
      role="button"
      className="gap-2 btn btn-sm justify-between flex"
      to={getFilterOptions("orderBy", orderBy, location, direction)}
      onClick={() => setDirection(direction === "desc" ? "asc" : "desc")}
    >
      {children}
      {direction === "desc" ? (
        <ChevronUp className="h-6 w-6" />
      ) : (
        <ChevronDown className="h-6 w-6" />
      )}
    </Link>
  );
};

export const Sort = () => {
  return (
    <div className="btn-group">
      {sortOptions.map((option) => (
        <ChevronButtonLink key={option.orderBy} orderBy={option.orderBy}>
          {option.label}
        </ChevronButtonLink>
      ))}
    </div>
  );
};
