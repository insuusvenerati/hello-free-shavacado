import type { ChangeEventHandler } from "react";
import { useMemo } from "react";
import type { UseRefinementListProps } from "react-instantsearch-hooks-web";
import { useRefinementList } from "react-instantsearch-hooks-web";

type Props = UseRefinementListProps;

export const RefinementList = ({ ...props }: Props) => {
  const { items, refine, toggleShowMore, canToggleShowMore, isShowingMore, searchForItems } =
    useRefinementList(props);
  const readableAttribute = props.attribute.split(".").join(" ").replace("name", "search");

  const onChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    refine(event.target.value);
  };

  const showMore = useMemo(() => {
    if (!canToggleShowMore) {
      return null;
    }

    return (
      <button type="button" className="btn-ghost btn btn-xs" onClick={toggleShowMore}>
        {isShowingMore ? "Show less" : "Show all"}
      </button>
    );
  }, [canToggleShowMore, isShowingMore, toggleShowMore]);

  return (
    <div className="grid gap-1">
      <input
        type="text"
        placeholder={readableAttribute}
        className="max-w-sx input input-sm mb-1"
        onChange={(event) => searchForItems(event.target.value)}
      />
      {showMore}
      {items.map((item) => (
        <label key={item.label} className="flex items-center">
          <input className="checkbox" type="checkbox" value={item.value} onChange={onChange} />
          <span className="ml-2">{item.label}</span>
          <span className="badge">{item.count}</span>
        </label>
      ))}
    </div>
  );
};
