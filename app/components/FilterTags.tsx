import type { Tag } from "@prisma/client";
import { useSearchParams } from "@remix-run/react";
import { useMatchesData } from "~/utils";

export const FilterTags = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const tag = searchParams.get("tag") ?? "New";
  const { tags } = useMatchesData<{ tags: Tag[] }>("routes/index");

  const handleSetTag = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchParams({ ...searchParams, tag: e.target.value });
  };

  return (
    <select
      onChange={handleSetTag}
      defaultValue={tag}
      className="select select-accent select-sm max-w-xs"
      name="tags"
    >
      {tags.map((tag) => (
        <option key={tag.id} value={tag.name}>
          {tag.name}
        </option>
      ))}
    </select>
  );
};
