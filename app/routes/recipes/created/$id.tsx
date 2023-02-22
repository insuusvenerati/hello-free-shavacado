import type { LoaderArgs } from "@remix-run/server-runtime";
import { typedjson, useTypedLoaderData } from "remix-typedjson";
import { Container } from "~/components/common/Container";
import { getCreatedRecipeById } from "~/models/recipe.server";

export const loader = async ({ request, params }: LoaderArgs) => {
  const response = await getCreatedRecipeById(request, params);
  return typedjson(response);
};

const CreatedRecipePage = () => {
  const data = useTypedLoaderData<typeof loader>();
  console.log(data);
  return (
    <Container>
      <h1 className="text-3xl font-bold">Created Recipes</h1>
      <p className="text-gray-500">Here are all the recipes you've created.</p>
      {JSON.stringify(data)}
    </Container>
  );
};

export default CreatedRecipePage;
