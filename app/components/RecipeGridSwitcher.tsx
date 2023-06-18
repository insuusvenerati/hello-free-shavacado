import type { User } from "@prisma/client";
import { useTypedFetcher } from "remix-typedjson";
import { useMatchesData } from "~/utils";
import type { SelectOption } from "./common/Select";
import { Select } from "./common/Select";
import type { action } from "~/routes/resource+/user-options";

const selectOptions: SelectOption[] = [
  { value: "vertical", label: "Vertical" },
  { value: "horizontal", label: "Horizontal" },
];

export const RecipeGridSwitcher = () => {
  const fetcher = useTypedFetcher<typeof action>();
  const { user } = useMatchesData<{ user: User }>("root");
  const userPageLayout = user.recipePageLayout ?? "horizontal";

  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    fetcher.submit(
      {
        recipePageLayout: event.currentTarget.value,
      },
      { method: "POST", action: "/resource/user-options" },
    );
  };

  return (
    <Select
      options={selectOptions}
      defaultValue={userPageLayout}
      onChange={handleSelect}
      title="Recipe Page Layout"
    />
  );
};
