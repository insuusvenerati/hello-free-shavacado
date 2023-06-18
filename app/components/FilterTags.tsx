/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
/* eslint-disable jsx-a11y/label-has-associated-control */
import type { Tag } from "@prisma/client";
import { Await, useLocation, useNavigate, useSearchParams } from "@remix-run/react";
import { Suspense } from "react";
import { getFilterOptions } from "~/hooks/useFilterOptions";
import { useMatchesData } from "~/utils";
import { Loader } from "./common/Loader";
import { Select } from "./common/Select";

export const FilterTags = () => {
  const [searchParams] = useSearchParams();
  const tag = searchParams.get("tag") ?? "New";
  const data = useMatchesData<{ tags: Tag[] }>("routes/_index");
  const location = useLocation();
  const navigate = useNavigate();

  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    navigate({
      pathname: "/",
      search: getFilterOptions("tag", event.currentTarget.value, location),
    });
  };

  return (
    <Suspense fallback={<Loader color="black" width={24} />}>
      <Await resolve={data?.tags}>
        {(tags) => (
          <Select
            defaultValue={tag}
            onChange={handleSelect}
            options={tags.flatMap((tag) => [
              {
                value: tag.name,
                label: tag.name,
              },
            ])}
            title="Tags"
          />
        )}
      </Await>
    </Suspense>
  );
};
