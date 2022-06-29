import { Container, List, Title } from "@mantine/core";
import { NextSeo } from "next-seo";
import { useGetGroceriesQuery } from "../hooks/useGetGroceriesQuery";

const Groceries = () => {
  const { data: groceries } = useGetGroceriesQuery();

  return (
    <>
      <NextSeo title="Groceries" />
      <Container>
        <Title mb="lg" order={2}>
          Groceries
        </Title>
        <List>
          {groceries?.map((grocery) => (
            <List.Item key={grocery.id}>
              {grocery.amount} {grocery.unit} {grocery.ingredient}
            </List.Item>
          ))}
        </List>
      </Container>
    </>
  );
};

export default Groceries;
