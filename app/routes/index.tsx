import { useMediaQuery } from "@mantine/hooks";
import type { User } from "@prisma/client";
import { Await, Link, useCatch, useLoaderData, useLocation } from "@remix-run/react";
import type { CatchBoundaryComponent } from "@remix-run/react/dist/routeModules";
import type { ErrorBoundaryComponent, LoaderArgs } from "@remix-run/server-runtime";
import { defer } from "@remix-run/server-runtime";
import { Suspense, useMemo } from "react";
import { AutoComplete } from "~/components/AutoComplete";
import { Container } from "~/components/common/Container";
import { Loader } from "~/components/common/loader/Loader";
import { RecipeGrid } from "~/components/common/RecipeGrid";
import { FilterTags } from "~/components/FilterTags";
import { GridLayoutSwitcher } from "~/components/GridLayoutSwitcher";
import { GridSizeSelect } from "~/components/GridSizeSelect";
import { RecipeCard } from "~/components/RecipeCard";
import { RecipeListItem } from "~/components/RecipeListItem";
import { Sort } from "~/components/Sort";
import { HF_AVATAR_IMAGE_URL } from "~/constants";
import { prisma } from "~/db.server";
import { getFilterOptions } from "~/hooks/useFilterOptions";
import { usePullRefresh } from "~/hooks/usePullRefresh";
import { getAllDbRecipes, getDbIngredients, getDbTags } from "~/models/recipe.server";
import { cn, useMatchesData } from "~/utils";

export const loader = async ({ request }: LoaderArgs) => {
  const url = new URL(request.url);
  const search = new URLSearchParams(url.search).get("search");
  const page = url.searchParams.get("page") || 1;
  const take = Number(url.searchParams.get("take")) || 20;
  const sort = url.searchParams.get("orderBy") || "averageRating";
  const tag = url.searchParams.get("tag");
  const ingredient = url.searchParams.get("ingredient");
  const direction = url.searchParams.get("direction") || "desc";
  const skip = (Number(page) - 1) * take;

  const results = getAllDbRecipes({ skip, take, search, sort, direction, tag, ingredient });
  const tags = await getDbTags();
  const ingredients = await getDbIngredients();

  const totalRecipes = await prisma.recipe.count();
  const totalPages = Math.ceil(totalRecipes / take);

  return defer(
    {
      results,
      ingredients,
      tags,
      totalRecipes,
      page: Number(page),
      totalPages,
    },
    {
      headers: {
        "Cache-Control": "max-age=0, s-maxage=60",
      },
    },
  );
};

export default function Index() {
  const location = useLocation();
  const matches = useMediaQuery("(min-width: 900px)", true, { getInitialValueInEffect: false });
  const { user } = useMatchesData<{ user: User | null }>("root");
  const gridLayout = user?.gridLayout ?? "grid";
  const recipes = useLoaderData<typeof loader>();
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

  const asideStyles = cn("flex items-start justify-between w-full mb-4", {
    "flex-col": !matches,
  });

  const selectStyles = cn("flex-0 flex gap-2", {
    "flex-col": !matches,
  });

  return (
    <>
      {!matches && (
        <div
          className="my-2 m-auto w-fit"
          style={{ marginTop: pullChange ? pullChange / 3.118 : "" }}
          ref={refreshContainer}
        >
          {isLoading ? <Loader /> : "Pull to refresh"}
        </div>
      )}
      <Container className="items-start">
        <aside className={asideStyles}>
          <div className="btn-group flex justify-center items-center mb-4">
            <Link to={getFilterOptions("page", "1", location)} className="btn btn-ghost max-w-xs">
              First
            </Link>
            <Link
              to={getFilterOptions("page", `${pagination.prevPage}`, location)}
              className="btn max-w-xs"
            >
              Prev
            </Link>
            <Link
              prefetch="intent"
              to={getFilterOptions("page", `${pagination.nextPage}`, location)}
              className="btn max-w-xs"
            >
              Next
            </Link>
            <Link
              to={getFilterOptions("page", `${recipes.totalPages}`, location)}
              className="btn btn-ghost max-w-xs"
            >
              Last
            </Link>
          </div>

          <div className={selectStyles}>
            <span className="flex flex-col gap-1 justify-center items-start">
              Ingredients
              <AutoComplete
                items={recipes.ingredients}
                getItemLabel={(item) => item.name}
                renderItem={(item) => (
                  <Link to={getFilterOptions("ingredient", item.name, location)}>
                    <img
                      width={50}
                      height={50}
                      className="h-8 w-8 rounded-full"
                      src={
                        item.imagePath
                          ? `${HF_AVATAR_IMAGE_URL}${item.imagePath}`
                          : "https://via.placeholder.com/50"
                      }
                      alt={item.name}
                    />
                    {item.name}
                  </Link>
                )}
              />
            </span>

            <span className="flex flex-col gap-1 justify-center items-start">
              Tags
              <FilterTags />
            </span>

            <span className="flex flex-col gap-1 justify-center items-start">
              Grid Size
              <GridSizeSelect />
            </span>

            <span className="flex flex-col gap-1 justify-center items-start">
              Grid Layout
              <GridLayoutSwitcher />
            </span>

            <span className="flex flex-col gap-1 justify-center items-start">
              Sort By
              <Sort />
            </span>
          </div>
        </aside>

        {gridLayout === "grid" && (
          <RecipeGrid className="lg:grid-cols-5">
            <Suspense fallback={<Loader />}>
              <Await resolve={recipes.results}>
                {(results) =>
                  results.map((recipe) => <RecipeCard key={recipe.id} recipe={recipe} />)
                }
              </Await>
            </Suspense>
          </RecipeGrid>
        )}

        {gridLayout === "list" && (
          <ul className="flex flex-col lg:max-h-96 flex-wrap gap-4">
            <Suspense fallback={<Loader />}>
              <Await resolve={recipes.results}>
                {(results) =>
                  results.map((recipe) => <RecipeListItem key={recipe.id} recipe={recipe} />)
                }
              </Await>
            </Suspense>
          </ul>
        )}
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
