import { XCircleIcon } from "@heroicons/react/outline";
import { Button } from "@mantine/core";
import { ClearRefinementsProps, useClearRefinements } from "react-instantsearch-hooks-web";

export const ClearRefinements = (props: ClearRefinementsProps) => {
  const { refine, canRefine } = useClearRefinements(props);
  return (
    <Button
      variant={canRefine ? "filled" : "outline"}
      leftIcon={<XCircleIcon width={16} />}
      onClick={refine}
    >
      Clear Filters
    </Button>
  );
};
