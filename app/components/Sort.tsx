import type { UseSortByProps } from "react-instantsearch-hooks-web";
import { useSortBy } from "react-instantsearch-hooks-web";

export function Sort(props: UseSortByProps) {
  const { refine, options } = useSortBy(props);

  return (
    <select
      onChange={(event) => refine(event.target.value)}
      className="max-w-sx select"
    >
      {options.map((option) => (
        <option value={option.value} key={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}
