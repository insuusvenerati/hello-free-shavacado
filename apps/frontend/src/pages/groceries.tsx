import { Container, List, Title } from "@mantine/core";
import { Layout } from "../components/Layout";
import { useGetGroceriesQuery } from "../hooks/useGetGroceriesQuery";

const Groceries = () => {
  const { data: groceries } = useGetGroceriesQuery();

  return (
    <Layout>
      <Container>
        <Title mb="lg" order={2}>
          Groceries
        </Title>
        <List>
          {groceries?.map((grocery) => (
            <List.Item key={grocery.id}>{grocery.ingredient}</List.Item>
          ))}
        </List>
      </Container>
    </Layout>
  );
};

export default Groceries;
