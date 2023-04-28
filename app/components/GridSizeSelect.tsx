import type { User } from "@prisma/client";
import { useTypedFetcher } from "remix-typedjson";
import { useMatchesData } from "~/utils";
import type { SelectOption } from "./common/Select";
import { Select } from "./common/Select";

const tagsOptions: SelectOption[] = [
  { value: "sm", label: "Small" },
  { value: "md", label: "Medium" },
  { value: "lg", label: "Large" },
];

export const GridSizeSelect = () => {
  const fetcher = useTypedFetcher();
  const data = useMatchesData<{ user: User }>("root");
  const userGridSize = data?.user?.gridSize ?? "md";

  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    fetcher.submit(
      { gridSize: event.target.value },
      { method: "POST", action: "/resource/user-options" },
    );
  };

  return (
    <Select
      onChange={handleSelect}
      defaultValue={userGridSize}
      options={tagsOptions}
      title="Grid Size"
    />
  );
};
