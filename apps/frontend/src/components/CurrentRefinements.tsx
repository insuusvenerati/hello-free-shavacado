import { CloseButton, Group } from "@mantine/core";
import { CurrentRefinementsProps, useCurrentRefinements } from "react-instantsearch-hooks-web";

export const CurrentRefinements = (props: CurrentRefinementsProps) => {
  // eslint-disable-next-line @typescript-eslint/unbound-method
  const { items } = useCurrentRefinements(props);

  return (
    <Group>
      {items.map((item) => (
        // <Badge size="lg" key={item.label}>
        <>
          {item.label}:{" "}
          {item.refinements.map((ref) => (
            <Group key={ref.label}>
              {ref.label}
              <CloseButton onClick={() => item.refine(ref)} size="xs" />
            </Group>
          ))}
        </>
        // </Badge>
      ))}
    </Group>
  );
};
