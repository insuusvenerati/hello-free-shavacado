import { withServerSideAuth } from "@clerk/nextjs/ssr";
import { Container, List, LoadingOverlay, Title } from "@mantine/core";
import { GetServerSideProps } from "next";
import { NextSeo } from "next-seo";
import { dehydrate, QueryClient } from "react-query";
import { useGetGroceriesQuery } from "../hooks/useGetGroceriesQuery";

export const getServerSideProps: GetServerSideProps = withServerSideAuth(
  async ({ req }) => {
    const queryClient = new QueryClient();
    if (req?.user?.id) {
      await queryClient.prefetchQuery(["groceries", req.user.id]);
      console.info("Prefetched Query");
    }

    return {
      props: {
        dehydratedState: dehydrate(queryClient),
      },
    };
  },
  { loadUser: true },
);

const Groceries = () => {
  const { data: groceries, isSuccess } = useGetGroceriesQuery();

  if (!isSuccess) {
    return <LoadingOverlay visible />;
  }

  return (
    <>
      <NextSeo title="Groceries" />
      <Container>
        <Title mb="lg" order={2}>
          Groceries
        </Title>
        <List>
          {groceries.groceries.map((grocery) => (
            <List.Item key={grocery.id}>{grocery.ingredient}</List.Item>
          ))}
        </List>
      </Container>
    </>
  );
};

export default Groceries;
