import type { LoaderArgs } from "@remix-run/server-runtime";
import { typedjson, useTypedLoaderData } from "remix-typedjson";
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
      <div className="text-xl mb-5">
        You currently have <strong> {count} </strong> favorite recipes!
      </div>
      <main className="container mx-auto p-1 lg:p-5">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-20">
          {favoriteRecipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe.recipe} />
          ))}
        </div>
      </main>
    </>
  );
};

export default UserFavoritesPage;
