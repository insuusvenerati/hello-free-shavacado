import type { User } from "@prisma/client";
import { useTypedFetcher } from "remix-typedjson";
import type { action } from "~/routes/resource/user-options";
import { useMatchesData } from "~/utils";

export const RecipeGridSwitcher = () => {
  const fetcher = useTypedFetcher<typeof action>();
  const { user } = useMatchesData<{ user: User }>("root");

  return (
    <select
      value={user?.recipePageLayout || "horizontal"}
      className="select select-accent max-w-xs"
      onChange={(value) =>
        fetcher.submit(
          { recipePageLayout: value.currentTarget.value },
          { method: "post", action: "/resource/user-options" },
        )
      }
    >
      <option value="vertical">Vertical</option>
      <option value="horizontal">Horizontal</option>
    </select>
  );
};
