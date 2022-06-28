import { Container, List, Title } from "@mantine/core";
import { useGetGroceriesQuery } from "../hooks/useGetGroceriesQuery";

const Groceries = () => {
  const { data: groceries } = useGetGroceriesQuery();

  return (
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
  );
};

export default Groceries;
