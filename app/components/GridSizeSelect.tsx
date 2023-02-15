import type { User } from "@prisma/client";
import { useTypedFetcher } from "remix-typedjson";
import { useMatchesData } from "~/utils";

export const GridSizeSelect = () => {
  const fetcher = useTypedFetcher();
  const data = useMatchesData<{ user: User }>("root");
  const userGridSize = data?.user?.gridSize ?? "md";

  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    fetcher.submit(
      { "grid-size": event.target.value },
      { method: "post", action: "/resource/user-options" },
    );
  };

  return (
    <fetcher.Form method="post" action="/resource/user-options">
      <select
        title="grid size"
        onChange={handleSelect}
        name="grid-size"
        defaultValue={userGridSize}
        className="select select-bordered max-w-xs"
      >
        <option className="text-xl" disabled>
          Grid Size
        </option>
        <option value="sm">Small</option>
        <option value="md">Medium</option>
        <option value="lg">Large</option>
      </select>
    </fetcher.Form>
  );
};
