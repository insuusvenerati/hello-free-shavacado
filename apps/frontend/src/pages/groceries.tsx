import { withServerSideAuth } from "@clerk/nextjs/ssr";
import {
  Avatar,
  Box,
  Container,
  createStyles,
  Group,
  LoadingOverlay,
  SegmentedControl,
  SegmentedControlItem,
  Text,
  Title,
} from "@mantine/core";
import { GetServerSideProps } from "next";
import { NextSeo } from "next-seo";
import { useMemo, useState } from "react";
import { dehydrate, QueryClient } from "react-query";
import { useGetGroceriesQuery } from "../hooks/useGetGroceriesQuery";
import { HF_AVATAR_IMAGE_URL } from "../util/constants";
import { getGroceries } from "../util/getGroceries";

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

export const getServerSideProps: GetServerSideProps = withServerSideAuth(
  async ({ req }) => {
    const user = req?.user?.id;
    const queryClient = new QueryClient();

    user &&
      (await queryClient.prefetchQuery(["groceries", user], () =>
        getGroceries({ userId: user, take: "10" }),
      ));

    return {
      props: {
        dehydratedState: dehydrate(queryClient),
      },
    };
  },
  { loadUser: true },
);

const Groceries = () => {
  const [take, setTake] = useState("10");
  const { data: groceries, isSuccess } = useGetGroceriesQuery({ take });
  const { classes } = useStyles();

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

  if (!isSuccess) {
    return <LoadingOverlay visible />;
  }

  return (
    <>
      <NextSeo title="Groceries" />
      <Container>
        <Group mb="lg" position="apart">
          <Title order={2}>Groceries</Title>
          <SegmentedControl value={take} onChange={setTake} data={segmentedControlData} />
        </Group>
        {groceries.map((grocery) => (
          <Box key={grocery.id} className={classes.item}>
            {grocery.imagePath && (
              <Avatar size="lg" mr="sm" src={`${HF_AVATAR_IMAGE_URL}${grocery.imagePath}`} />
            )}
            <div>
              <Text> {grocery.ingredient} </Text>
              <Text color="dimmed" size="sm">
                Family: {grocery.family} ⦁ Amount: {grocery.amount} ⦁ Unit: {grocery.unit}
              </Text>
            </div>
          </Box>
        ))}
      </Container>
    </>
  );
};

export default Groceries;
