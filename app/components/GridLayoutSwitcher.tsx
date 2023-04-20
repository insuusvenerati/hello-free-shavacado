import type { User } from "@prisma/client";
import { useTypedFetcher } from "remix-typedjson";
import type { action } from "~/routes/resource.user-options";
import { useMatchesData } from "~/utils";

export const GridLayoutSwitcher = () => {
  const fetcher = useTypedFetcher<typeof action>();
  const { user } = useMatchesData<{ user: User }>("root");

  return (
    <select
      value={user?.gridLayout || "horizontal"}
      onChange={(value) => {
        fetcher.submit(
          { gridLayout: value.currentTarget.value },
          { method: "post", action: "/resource/user-options" },
        );
      }}
      className="select-accent select select-sm max-w-xs"
      name="gridLayout"
      title="Grid Layout"
    >
      <option disabled className="text-xl">
        Grid Layout
      </option>
      <option value="list">List</option>
      <option value="grid">Grid</option>
    </select>
  );
};
