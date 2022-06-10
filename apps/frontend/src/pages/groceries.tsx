import { useGetGroceriesQuery } from "../hooks/useGetGroceriesQuery";

const Groceries = () => {
  const { data: groceries } = useGetGroceriesQuery();

  return <pre>{JSON.stringify(groceries, null, 2)}</pre>;
};

export default Groceries;
