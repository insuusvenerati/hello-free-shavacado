import { Response } from "@remix-run/node";
import { useCatch, useLoaderData } from "@remix-run/react";
import type { ErrorBoundaryComponent, LoaderArgs, MetaFunction } from "@remix-run/server-runtime";
import { json } from "@remix-run/server-runtime";
import { typedjson, useTypedLoaderData } from "remix-typedjson";
import { RecipeCard } from "~/components/RecipeCard";
import { prisma } from "~/db.server";
import { requireUser } from "~/session.server";

export const meta: MetaFunction = () => ({
  title: "Recipes",
});

export const loader = async ({ request }: LoaderArgs) => {
  const user = await requireUser(request);
  const recipes = await prisma.favoriteRecipe.findMany({
    where: {
      userId: user.id,
    },
    select: {
      recipe: {
        include: {
          tags: true,
        },
      },
    },
  });

  if (!recipes) {
    throw new Response("No recipes found", { status: 404 });
  }

  const favoriteRecipes = recipes.map((recipe) => ({ ...recipe.recipe }));

  return typedjson(favoriteRecipes);
};

const RecipesPage = () => {
  const favoriteRecipes = useTypedLoaderData<typeof loader>();

  return (
    <main className="container mx-auto mt-10 h-screen">
      <h1 className="mb-10 text-center text-5xl">Imported Recipes</h1>
      <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
        {favoriteRecipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>
    </main>
  );
};

export default RecipesPage;

export const CatchBoundary = () => {
  const caught = useCatch();
  console.log(caught);

  return (
    <main className="container mx-auto mt-10">
      <h1 className="text-center text-2xl font-bold"> {caught.statusText} </h1>
    </main>
  );
};

export const ErrorBoundary: ErrorBoundaryComponent = ({ error }) => {
  console.log(error);

  return (
    <main className="container mx-auto mt-10">
      <h1 className="text-center text-2xl font-bold"> {error.message} </h1>
    </main>
  );
};
