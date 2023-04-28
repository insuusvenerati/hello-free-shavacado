import type { User } from "@prisma/client";
import { useTypedFetcher } from "remix-typedjson";
import type { action } from "~/routes/resource.user-options";
import { useMatchesData } from "~/utils";
import type { SelectOption } from "./common/Select";
import { Select } from "./common/Select";

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
    // <select
    //   value={user?.recipePageLayout || "horizontal"}
    //   className="select-accent select max-w-xs"
    //   onChange={(value) =>
    //     fetcher.submit(
    //       { recipePageLayout: value.currentTarget.value },
    //       { method: "post", action: "/resource/user-options" },
    //     )
    //   }
    // >
    //   <option value="vertical">Vertical</option>
    //   <option value="horizontal">Horizontal</option>
    // </select>
  );
};
