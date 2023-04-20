import { useMediaQuery } from "@mantine/hooks";
import type { User } from "@prisma/client";
import {
  Await,
  Link,
  useCatch,
  useFetchers,
  useLoaderData,
  useLocation,
  useNavigation,
} from "@remix-run/react";
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
import { getFilterOptions } from "~/hooks/useFilterOptions";
import { usePullRefresh } from "~/hooks/usePullRefresh";
import { getAllDbRecipes, getDbIngredients, getRecipeCount } from "~/models/recipe.server";
import { useMatchesData } from "~/utils";

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
  const ingredients = getDbIngredients();
  const resultsCount = getRecipeCount({ search, tag, ingredient });

  const totalPages = Math.ceil((await resultsCount) / take);

  return defer({
    results,
    ingredients,
    page: Number(page),
    totalPages,
  });
};

export default function Index() {
  const location = useLocation();
  const { user } = useMatchesData<{ user: User | null }>("root");
  const matches = useMediaQuery("(min-width: 1024px)", false, { getInitialValueInEffect: true });
  const gridLayout = user?.gridLayout ?? "grid";
  const recipes = useLoaderData<typeof loader>();
  const transition = useNavigation();
  const fetchers = useFetchers();
  const { pullChange, refreshContainer } = usePullRefresh();

  const state = useMemo<"idle" | "loading">(() => {
    const states = [transition.state, ...fetchers.map((fetcher) => fetcher.state)];
    if (states.every((state) => state === "idle")) return "idle";
    return "loading";
  }, [fetchers, transition.state]);

  const isLoading = useMemo(() => state !== "idle", [state]);

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
          className="m-auto my-2 w-fit"
          style={{ marginTop: pullChange ? pullChange / 3.118 : "" }}
          ref={refreshContainer}
        >
          {isLoading ? (
            <Loader />
          ) : pullChange!! > 75 ? (
            <span className="font-semibold">Pull to refresh</span>
          ) : null}
        </div>
      )}
      <Container className="container mx-auto">
        <aside className="flex flex-col items-center lg:flex-row lg:justify-between">
          <div className="btn-group flex items-center lg:justify-center">
            <Link to={getFilterOptions("page", "1", location)} className="btn-ghost btn max-w-xs">
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
              className="btn-ghost btn max-w-xs"
            >
              Last
            </Link>
          </div>

          <div className="flex-0 flex flex-col gap-2 lg:flex-row">
            <span className="flex flex-col items-start justify-center gap-1">
              Ingredients
              <Suspense>
                <Await resolve={recipes.ingredients}>
                  {(ingredients) => (
                    <AutoComplete
                      items={ingredients}
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
                  )}
                </Await>
              </Suspense>
            </span>

            <span className="flex flex-col items-start justify-center gap-1">
              Tags
              <FilterTags />
            </span>

            <span className="flex flex-col items-start justify-center gap-1">
              Grid Size
              <GridSizeSelect />
            </span>

            <span className="flex flex-col items-start justify-center gap-1">
              Grid Layout
              <GridLayoutSwitcher />
            </span>

            <span className="flex flex-col items-start justify-center gap-1">
              Sort By
              <Sort />
            </span>
          </div>
        </aside>

        {gridLayout === "grid" && (
          <RecipeGrid className="lg:grid-cols-5">
            <Suspense>
              <Await resolve={recipes.results}>
                {(results) =>
                  results.map((recipe) => <RecipeCard key={recipe.id} recipe={recipe} />)
                }
              </Await>
            </Suspense>
          </RecipeGrid>
        )}

        {gridLayout === "list" && (
          <ul className="flex flex-col flex-wrap gap-4 lg:max-h-96">
            <Suspense fallback={<Loader />}>
              <Await resolve={recipes.results}>
                {(results) =>
                  results.length > 0 ? (
                    results.map((recipe) => <RecipeListItem key={recipe.id} recipe={recipe} />)
                  ) : (
                    <h1 className="text-center text-2xl">No recipes found</h1>
                  )
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
    <main className="container mx-auto h-screen p-1 lg:p-5">
      <h1>Something went wrong</h1>
      <pre>{caught.data}</pre>
    </main>
  );
};

export const ErrorBoundary: ErrorBoundaryComponent = ({ error }) => {
  return (
    <main className="container mx-auto h-screen p-1 lg:p-5">
      <h1>Something went wrong</h1>
      <pre>{error.message}</pre>
    </main>
  );
};
