import { useRouter } from "next/router";

const Recipe = () => {
  const router = useRouter();
  const { recipe } = router.query;

  return <div>{JSON.stringify(recipe, null, 2)}</div>;
};

export default Recipe;
