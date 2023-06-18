import type { User } from "@prisma/client";
import { useTypedFetcher } from "remix-typedjson";
import { useMatchesData } from "~/utils";
import type { SelectOption } from "./common/Select";
import { Select } from "./common/Select";
import type { action } from "~/routes/resource+/user-options";

const tagsOptions: SelectOption[] = [
  { value: "list", label: "List" },
  { value: "grid", label: "Grid" },
];

export const GridLayoutSwitcher = () => {
  const fetcher = useTypedFetcher<typeof action>();
  const { user } = useMatchesData<{ user: User }>("root");
  const userGridLayout = user?.gridLayout ?? "grid";

  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    fetcher.submit(
      {
        gridLayout: event.currentTarget.value,
      },
      { method: "POST", action: "/resource/user-options" },
    );
  };

  return (
    <Select
      defaultValue={userGridLayout}
      onChange={handleSelect}
      options={tagsOptions}
      title="Grid Layout"
    />
  );
};
