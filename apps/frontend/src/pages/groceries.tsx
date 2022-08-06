import {
  Avatar,
  Box,
  Container,
  createStyles,
  Group,
  LoadingOverlay,
  SegmentedControl,
  SegmentedControlItem,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { NextSeo } from "next-seo";
import { FC, useMemo, useState } from "react";
import { useGetGroceriesQuery } from "../hooks/useGetGroceriesQuery";
import { Grocery } from "../types/grocery";
import { HF_AVATAR_IMAGE_URL } from "../util/constants";

const useStyles = createStyles((theme) => ({
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  item: {
    ...theme.fn.focusStyles(),
    display: "flex",
    alignItems: "center",
    borderRadius: theme.radius.md,
    border: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[2]
    }`,
    padding: `${theme.spacing.sm}px ${theme.spacing.xl}px`,
    backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.white,
    marginBottom: theme.spacing.sm,
  },

  itemDragging: {
    boxShadow: theme.shadows.sm,
  },

  symbol: {
    fontSize: 30,
    fontWeight: 700,
    width: 60,
  },
}));

const sortedGroceries = (
  groceries: Grocery[],
  sortMethod: "ingredient" | "amount",
  isSuccess: boolean,
) => {
  if (!isSuccess) return;

  if (sortMethod === "amount") {
    return groceries.sort((a, b) => (a.amount! > b.amount! ? 1 : -1));
  }

  return groceries.sort((a, b) =>
    a.ingredient.toLowerCase().localeCompare(b.ingredient.toLowerCase()),
  );
};

type GroceryGridProps = {
  view: "row" | "column";
  children?: JSX.Element | JSX.Element[];
};

const GroceryGrid: FC<GroceryGridProps> = ({ view, children }) => {
  if (view === "row") return <Group> {children} </Group>;
  return <Stack> {children} </Stack>;
};

const Groceries = () => {
  const [take, setTake] = useState("10");
  const { data: groceries, isSuccess } = useGetGroceriesQuery({ take });
  const { classes } = useStyles();
  const [view, setView] = useState<"row" | "column">("column");
  const [sort, setSort] = useState<"ingredient" | "amount">("ingredient");

  const segmentedControlData = useMemo<SegmentedControlItem[]>(
    () => [
      {
        label: 10,
        value: "10",
      },
      {
        label: 20,
        value: "20",
      },
      {
        label: 30,
        value: "30",
      },
    ],
    [],
  );

  const viewSegmentedControlData = useMemo<SegmentedControlItem[]>(
    () => [
      {
        label: "Row",
        value: "row",
      },
      {
        label: "Column",
        value: "column",
      },
    ],
    [],
  );

  const sortSegmentedControlData = useMemo<SegmentedControlItem[]>(
    () => [
      {
        label: "Amount",
        value: "amount",
      },
      {
        label: "Ingredient",
        value: "ingredient",
      },
    ],
    [],
  );

  const handleViewChange = (value: "row" | "column") => {
    setView(value);
  };

  const handleSortChange = (value: "ingredient" | "amount") => {
    setSort(value);
  };

  if (!isSuccess) {
    return <LoadingOverlay visible />;
  }

  return (
    <>
      <NextSeo title="Groceries" />
      <Container>
        <Group mb="lg" position="apart">
          <Title order={2}>Groceries</Title>
          <Group>
            <SegmentedControl value={take} onChange={setTake} data={segmentedControlData} />
            <SegmentedControl
              value={view}
              onChange={handleViewChange}
              data={viewSegmentedControlData}
            />
            <SegmentedControl
              value={sort}
              onChange={handleSortChange}
              data={sortSegmentedControlData}
            />
          </Group>
        </Group>
        <GroceryGrid view={view}>
          {sortedGroceries(groceries, sort, isSuccess)?.map((grocery) => (
            <Box key={grocery.id} className={classes.item}>
              {grocery.imagePath && (
                <Avatar size="lg" mr="sm" src={`${HF_AVATAR_IMAGE_URL}${grocery.imagePath}`} />
              )}
              <Title mr="sm" order={1}>
                {grocery.amount}
              </Title>
              <div>
                <Text>{grocery.ingredient}</Text>
              </div>
            </Box>
          ))}
        </GroceryGrid>
      </Container>
    </>
  );
};

export default Groceries;
