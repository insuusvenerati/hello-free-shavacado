import { Form, useCatch } from "@remix-run/react";
import type { ActionArgs, ErrorBoundaryComponent, MetaFunction } from "@remix-run/server-runtime";
import { useEffect, useMemo, useState } from "react";
import { typedjson, useTypedActionData } from "remix-typedjson";
import invariant from "tiny-invariant";
import { RecipeCard } from "~/components/RecipeCard";
import { prisma } from "~/db.server";
import { requireUser } from "~/session.server";
import type { FavoritesWithRecipeAndId } from "~/types/favorites";
import { useMatchesData } from "~/utils";

export const meta: MetaFunction = () => ({
  title: "Recipes",
});

export const action = async ({ request }: ActionArgs) => {
  const user = await requireUser(request);
  const formData = await request.formData();
  const query = formData.get("query");
  invariant(query, "Query is required");
  const results = await prisma.favoriteRecipe.findMany({
    where: {
      AND: [
        { user: { some: { id: user.id } } },
        { recipe: { name: { contains: query as string } } },
      ],
      OR: [{ recipe: { description: { contains: query as string } } }],
    },
    select: {
      id: true,
      recipe: {
        include: {
          tags: true,
        },
      },
    },
  });

  if (results.length === 0) {
    return { results: [] };
  }
  return typedjson({ results: results });
};

const RecipesPage = () => {
  const favoriteRecipesFromSearch = useTypedActionData<{ results: FavoritesWithRecipeAndId }>();
  const [results, setResults] = useState<FavoritesWithRecipeAndId | undefined>();
  const hasResults = useMemo(() => {
    return (
      typeof favoriteRecipesFromSearch !== "undefined" &&
      typeof favoriteRecipesFromSearch?.results !== "undefined" &&
      favoriteRecipesFromSearch?.results?.length > 0
    );
  }, [favoriteRecipesFromSearch]);

  const favoriteRecipes = useMatchesData<{ favoriteRecipes: FavoritesWithRecipeAndId }>(
    "root",
  )?.favoriteRecipes;

  useEffect(() => {
    if (hasResults) {
      setResults(favoriteRecipesFromSearch?.results);
    }
  }, [favoriteRecipesFromSearch?.results, hasResults]);

  return (
    <main className="container mx-auto mt-5 h-screen">
      <Form action="/favorites" method="post" className="form-control gap-2 max-w-md mb-4">
        <label className="label" htmlFor="query">
          <span className="label-text">Search</span>
        </label>
        <input name="query" placeholder="Search your favorites" type="search" className="input" />
        <button type="submit" className="btn max-w-xs">
          Submit
        </button>
        {hasResults && (
          <button
            type="button"
            onClick={() => setResults(undefined)}
            className="btn btn-error max-w-xs"
          >
            Clear
          </button>
        )}
      </Form>

      {hasResults && (
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-6">
          {results?.map((recipe) => (
            <RecipeCard className="max-w-xs" key={recipe.id} recipe={recipe.recipe} />
          ))}
        </div>
      )}
      <h1 className="mb-10 text-center text-5xl">Favorite Recipes</h1>
      <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
        {favoriteRecipes?.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe.recipe} />
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
