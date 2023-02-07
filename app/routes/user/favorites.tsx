import type { LoaderArgs } from "@remix-run/server-runtime";
import { typedjson, useTypedLoaderData } from "remix-typedjson";
import { RecipeGrid } from "~/components/common/RecipeGrid";
import { RecipeCard } from "~/components/RecipeCard";
import { getUserFavorites } from "~/db/getUserFavorites.server";
import { requireUser } from "~/session.server";

export const loader = async ({ request }: LoaderArgs) => {
  const user = await requireUser(request);
  const favoriteRecipes = await getUserFavorites(user.id);

  return typedjson(favoriteRecipes);
};

const UserFavoritesPage = () => {
  const favoriteRecipes = useTypedLoaderData<typeof loader>();
  const count = favoriteRecipes.length;

  return (
    <>
      <main className="flex flex-col items-center p-1 lg:p-5">
        <div className="text-xl mb-5">
          You currently have <strong> {count} </strong> favorite recipes!
        </div>
        <RecipeGrid>
          {favoriteRecipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe.recipe} />
          ))}
        </RecipeGrid>
      </main>
    </>
  );
};

export default UserFavoritesPage;
