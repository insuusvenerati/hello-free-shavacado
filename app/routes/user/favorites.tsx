import type { LoaderArgs } from "@remix-run/server-runtime";
import { typedjson, useTypedLoaderData } from "remix-typedjson";
import { RecipeCard } from "~/components/RecipeCard";
import { prisma } from "~/db.server";
import { requireUser } from "~/session.server";

export const loader = async ({ params, request }: LoaderArgs) => {
  const user = await requireUser(request);
  const favoriteRecipes = await prisma.favoriteRecipe.findMany({
    where: { user: { every: { id: user.id } } },
    include: { recipe: { include: { tags: true } } },
  });

  return typedjson({ favoriteRecipes });
};

const UserFavoritesPage = () => {
  const { favoriteRecipes } = useTypedLoaderData<typeof loader>();
  const count = favoriteRecipes.length;

  return (
    <>
      <div className="text-xl mb-5">
        You currently have <strong> {count} </strong> favorite recipes!
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {favoriteRecipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe.recipe} />
        ))}
      </div>
    </>
  );
};

export default UserFavoritesPage;
