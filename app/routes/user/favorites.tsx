import type { LoaderArgs } from "@remix-run/server-runtime";
import { typedjson } from "remix-typedjson";
import { RecipeCard } from "~/components/RecipeCard";
import { prisma } from "~/db.server";
import { requireUser } from "~/session.server";
import type { FavoritesWithRecipeAndId } from "~/types/favorites";
import { useMatchesData } from "~/utils";

export const loader = async ({ params, request }: LoaderArgs) => {
  const user = await requireUser(request);
  const favoriteRecipes = await prisma.favoriteRecipe.findMany({
    where: { user: { every: { id: user.id } } },
    include: { recipe: { include: { tags: true } } },
  });

  return typedjson({ favoriteRecipes });
};

const UserFavoritesPage = () => {
  const favoriteRecipes = useMatchesData<{ favoriteRecipes: FavoritesWithRecipeAndId }>(
    "root",
  )?.favoriteRecipes;
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
