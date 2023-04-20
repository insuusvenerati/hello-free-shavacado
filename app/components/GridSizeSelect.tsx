import type { User } from "@prisma/client";
import type { FormProps } from "@remix-run/react";
import { useTypedFetcher } from "remix-typedjson";
import { cn, useMatchesData } from "~/utils";

type GridSizeSelectProps = {
  className?: string;
} & Omit<
  React.ForwardRefExoticComponent<FormProps & React.RefAttributes<HTMLFormElement>>,
  "$$typeof"
>;

export const GridSizeSelect = ({ className, ...props }: GridSizeSelectProps) => {
  const fetcher = useTypedFetcher();
  const data = useMatchesData<{ user: User }>("root");
  const styles = cn(className);
  const userGridSize = data?.user?.gridSize ?? "md";

  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    fetcher.submit(
      { gridSize: event.target.value },
      { method: "post", action: "/resource/user-options" },
    );
  };

  return (
    <fetcher.Form {...props} className={styles} method="post" action="/resource/user-options">
      <select
        title="grid size"
        onChange={handleSelect}
        name="gridSize"
        defaultValue={userGridSize}
        className="select-accent select select-sm max-w-xs"
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
