/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
/* eslint-disable jsx-a11y/label-has-associated-control */
import type { Tag } from "@prisma/client";
import { Link, useLocation, useSearchParams } from "@remix-run/react";
import { getFilterOptions } from "~/hooks/useFilterOptions";
import { useMatchesData } from "~/utils";

export const FilterTags = () => {
  const [searchParams] = useSearchParams();
  const tag = searchParams.get("tag") ?? "New";
  const { tags } = useMatchesData<{ tags: Tag[] }>("routes/index");
  const location = useLocation();

  return (
    <div className="dropdown">
      <label tabIndex={0} className="btn btn-sm m-1">
        Tags
      </label>
      <ul tabIndex={0} defaultValue={tag} className="menu p-2 bg-base-100 dropdown-content w-52">
        {tags.map((tag) => (
          <li key={tag.id}>
            <Link to={getFilterOptions("tag", tag.name, location)}>{tag.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
