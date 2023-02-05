import { useMediaQuery } from "@mantine/hooks";
import { Link, useCatch } from "@remix-run/react";
import type { CatchBoundaryComponent } from "@remix-run/react/dist/routeModules";
import type { ErrorBoundaryComponent, LoaderArgs } from "@remix-run/server-runtime";
import { useMemo } from "react";
import { typedjson, useTypedLoaderData } from "remix-typedjson";
import { RecipeCard } from "~/components/RecipeCard";
import { prisma } from "~/db.server";
import { usePullRefresh } from "~/hooks/usePullRefresh";

export const loader = async ({ request }: LoaderArgs) => {
  const url = new URL(request.url);
  const search = new URLSearchParams(url.search);
  const page = url.searchParams.get("page") || 1;
  const take = Number(url.searchParams.get("take")) || 20;
  const skip = (Number(page) - 1) * take;

  const results = await prisma.recipe.findMany({
    where: {
      OR: [
        {
          name: {
            contains: search.get("search") || "",
          },
        },
        {
          description: {
            contains: search.get("search") || "",
          },
        },
      ],
    },
    skip,
    take,
    include: {
      tags: true,
    },
    orderBy: [{ averageRating: "desc" }, { ratingsCount: "desc" }],
  });

  const totalRecipes = await prisma.recipe.count();
  const totalPages = Math.ceil(totalRecipes / take);
  const totalRecipeResults = results.length;

  return typedjson({ results, totalRecipes, page: Number(page), totalPages, totalRecipeResults });
};

export default function Index() {
  const matches = useMediaQuery("(min-width: 900px)");
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
      <main className="container mx-auto p-1 lg:p-5">
        <div className="btn-group flex justify-center">
          <Link to={`/?page=1`} className="btn btn-ghost max-w-xs">
            First
          </Link>
          <Link to={`/?page=${pagination.prevPage}`} className="btn max-w-xs">
            Prev
          </Link>
          <Link to={`/?page=${pagination.nextPage}`} className="btn max-w-xs">
            Next
          </Link>
          <Link to={`/?page=${recipes.totalPages}`} className="btn btn-ghost max-w-xs">
            Last
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-4 p-2 md:grid-cols-2 lg:grid-cols-5 lg:ml-40">
          {recipes.results.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
          {recipes.totalRecipeResults === 0 && (
            <div className="col-span-full text-center">
              <h1 className="text-2xl">No results found</h1>
            </div>
          )}
        </div>
      </main>
    </>
  );
}

export const CatchBoundary: CatchBoundaryComponent = () => {
  const caught = useCatch();
  return (
    <main className="container mx-auto p-1 lg:p-5">
      <h1>Something went wrong</h1>
      <pre>{caught.data}</pre>
    </main>
  );
};

export const ErrorBoundary: ErrorBoundaryComponent = ({ error }) => {
  return (
    <main className="container mx-auto p-1 lg:p-5">
      <h1>Something went wrong</h1>
      <pre>{error.message}</pre>
    </main>
  );
};
