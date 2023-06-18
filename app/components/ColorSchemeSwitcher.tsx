import { useTypedFetcher } from "remix-typedjson";
import type { action } from "~/routes/resource+/set-theme";
import { useMatchesData } from "~/utils";

export const ColorSchemeSwitcher = () => {
  const themeFetcher = useTypedFetcher<typeof action>();
  const matches = useMatchesData<{ colorScheme: string }>("root");

  return (
    <select
      value={matches?.colorScheme || "dark"}
      className="select-accent select max-w-xs"
      onChange={(value) =>
        themeFetcher.submit(
          { theme: value.currentTarget.value },
          { method: "post", action: "/resource/set-theme" },
        )
      }
    >
      <option value="cream">Cream 🍦</option>
      <option value="dark">Dark 🌑</option>
      <option value="light">Light ☀️</option>
      <option value="halloween">Halloween 👻</option>
    </select>
  );
};
