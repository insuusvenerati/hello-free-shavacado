import { useMediaQuery } from "@mantine/hooks";
import { Link, useCatch } from "@remix-run/react";
import type { CatchBoundaryComponent } from "@remix-run/react/dist/routeModules";
import type { ErrorBoundaryComponent, LoaderArgs } from "@remix-run/server-runtime";
import { useMemo } from "react";
import { typedjson, useTypedLoaderData } from "remix-typedjson";
import { Container } from "~/components/common/Container";
import { RecipeGrid } from "~/components/common/RecipeGrid";
import { GridSizeSelect } from "~/components/GridSizeSelect";
import { RecipeCard } from "~/components/RecipeCard";
import { prisma } from "~/db.server";
import { usePullRefresh } from "~/hooks/usePullRefresh";
import { getAllRecipes } from "~/models/recipe.server";
import { getTokenFromDatabase } from "~/models/token.server";

export const loader = async ({ request }: LoaderArgs) => {
  const url = new URL(request.url);
  const search = new URLSearchParams(url.search);
  const page = url.searchParams.get("page") || 1;
  const take = Number(url.searchParams.get("take")) || 20;
  const skip = (Number(page) - 1) * take;
  const token = await getTokenFromDatabase();

  if (typeof token !== "string") {
    throw new Response(`Unable to get recipes from API. Try again later.\nReason: ${token}`, {
      status: 401,
    });
  }

  const results = await getAllRecipes({
    take,
    skip,
    token,
    search: search.get("search") ?? "",
  });
  // const results = await prisma.recipe.findMany({
  //   where: {
  //     OR: [
  //       {
  //         name: {
  //           contains: search.get("search") || "",
  //         },
  //       },
  //       {
  //         description: {
  //           contains: search.get("search") || "",
  //         },
  //       },
  //     ],
  //   },
  //   skip,
  //   take,
  //   include: {
  //     tags: true,
  //     ingredients: true,
  //     steps: true,
  //   },
  //   orderBy: [{ averageRating: "desc" }],
  // });

  const filteredResults = results.items.filter(
    (recipe) => recipe.ingredients.length > 1 && recipe.steps.length > 1,
  );

  const totalRecipes = await prisma.recipe.count();
  const totalPages = Math.ceil(totalRecipes / take);
  const totalRecipeResults = results.items.length;

  return typedjson({
    results: filteredResults,
    totalRecipes,
    page: Number(page),
    totalPages,
    totalRecipeResults,
    token,
  });
};

export default function Index() {
  const matches = useMediaQuery("(min-width: 900px)", true, { getInitialValueInEffect: false });
  const recipes = useTypedLoaderData<typeof loader>();
  const { refreshContainer, pullChange } = usePullRefresh();
  const isLoading = useMemo(() => {
    if (typeof pullChange === "undefined") return false;
    return pullChange > 220;
  }, [pullChange]);

  const pagination = useMemo(() => {
    const prevPage = recipes.page - 1 || 1;
    const nextPage = recipes.page + 1;

    return {
      prevPage,
      nextPage,
    };
  }, [recipes.page]);

  return (
    <>
      {!matches && (
        <div
          className="my-2 m-auto w-fit"
          style={{ marginTop: pullChange ? pullChange / 3.118 : "" }}
          ref={refreshContainer}
        >
          {isLoading ? "Loading..." : "Pull to refresh"}
        </div>
      )}
      <Container>
        <aside className="flex flex-col items-center justify-center w-full mb-4">
          <h1 className="text-2xl font-bold">Recipes</h1>
          <p className="text-center">
            {recipes.totalRecipes} recipes found. Showing {recipes.results.length} results.
          </p>
        </aside>

        <div className="btn-group flex justify-center mb-4">
          <Link to={`/?page=1`} className="btn btn-ghost max-w-xs">
            First
          </Link>
          <Link to={`/?page=${pagination.prevPage}`} className="btn max-w-xs">
            Prev
          </Link>
          <Link prefetch="intent" to={`/?page=${pagination.nextPage}`} className="btn max-w-xs">
            Next
          </Link>
          <Link to={`/?page=${recipes.totalPages}`} className="btn btn-ghost max-w-xs">
            Last
          </Link>
          {matches && <GridSizeSelect />}
        </div>
        <RecipeGrid className="lg:grid-cols-5">
          {recipes.results.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
          {recipes.totalRecipeResults === 0 && (
            <div className="col-span-full text-center">
              <h1 className="text-2xl">No results found</h1>
            </div>
          )}
        </RecipeGrid>
      </Container>
    </>
  );
}

export const CatchBoundary: CatchBoundaryComponent = () => {
  const caught = useCatch();
  return (
    <main className="container mx-auto p-1 h-screen lg:p-5">
      <h1>Something went wrong</h1>
      <pre>{caught.data}</pre>
    </main>
  );
};

export const ErrorBoundary: ErrorBoundaryComponent = ({ error }) => {
  return (
    <main className="container mx-auto p-1 lg:p-5 h-screen">
      <h1>Something went wrong</h1>
      <pre>{error.message}</pre>
    </main>
  );
};
