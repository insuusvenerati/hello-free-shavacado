import { Button, Checkbox, Group } from "@mantine/core";
import { RefinementListProps, useRefinementList } from "react-instantsearch-hooks-web";

export const RefinementList = (props: RefinementListProps) => {
  // eslint-disable-next-line @typescript-eslint/unbound-method
  const { items, refine, isShowingMore, toggleShowMore } = useRefinementList(props);

  return (
    <>
      <Group spacing="xs" mb="sm">
        {items.map((item) => (
          <Checkbox
            onChange={(event) => refine(event.target.value)}
            checked={item.isRefined}
            key={item.label}
            value={item.value}
            label={`${item.label} ${item.count}`}
          />
        ))}
      </Group>
      <Button compact size="xs" onClick={toggleShowMore}>
        {isShowingMore ? "Show Less" : "Show More"}
      </Button>
    </>
  );
};
