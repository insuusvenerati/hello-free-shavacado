import { trpc } from "../hooks/trpc";

const Test = () => {
  const recipe = trpc.useQuery(["hellofresh.search", { query: "chicken" }]);

  if (!recipe.data) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <pre>{JSON.stringify(recipe.data, null, 2)}</pre>
    </div>
  );
};

export default Test;
