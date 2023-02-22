import { Link } from "@remix-run/react";
import type { LoaderArgs } from "@remix-run/server-runtime";
import { typedjson, useTypedLoaderData } from "remix-typedjson";
import { Container } from "~/components/common/Container";
import { getCreatedRecipes } from "~/models/recipe.server";

export const loader = async ({ request }: LoaderArgs) => {
  const response = await getCreatedRecipes(request);
  return typedjson(response);
};

const CreatedRecipesPage = () => {
  const data = useTypedLoaderData<typeof loader>();
  console.log(data);
  return (
    <Container>
      <h1 className="text-3xl font-bold">Created Recipes</h1>
      <p className="text-gray-500">Here are all the recipes you've created.</p>
      <ul>
        {data.map((recipe) => (
          <li key={recipe.id}>
            <Link className="link" to={`/recipes/created/${recipe.id}`}>
              {recipe.name}
            </Link>
          </li>
        ))}
      </ul>
    </Container>
  );
};

export default CreatedRecipesPage;
