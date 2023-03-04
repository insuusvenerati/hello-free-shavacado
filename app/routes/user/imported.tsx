import { Prisma } from "@prisma/client";
import { useCatch } from "@remix-run/react";
import type { ActionArgs, ErrorBoundaryComponent, LoaderArgs } from "@remix-run/server-runtime";
import clsx from "clsx";
import { useEffect, useRef } from "react";
import { toast } from "react-toastify";
import { redirect, typedjson, useTypedFetcher, useTypedLoaderData } from "remix-typedjson";
import invariant from "tiny-invariant";
import { Container } from "~/components/common/Container";
import { RecipeGrid } from "~/components/common/RecipeGrid";
import { GridSizeSelect } from "~/components/GridSizeSelect";
import { ImportedRecipeCard } from "~/components/ImportedRecipeCard";
import { prisma } from "~/db.server";
import { requireUser } from "~/session.server";

export const action = async ({ request }: ActionArgs) => {
  const recipeDataScraper = (await import("recipe-data-scraper")).default;
  const user = await requireUser(request);
  const formData = await request.formData();
  const url = formData.get("url");
  const recipeId = formData.get("recipeId");

  try {
    switch (request.method) {
      case "DELETE": {
        invariant(typeof recipeId === "string", "Missing recipeId");
        await prisma.importedRecipe.delete({
          where: {
            id: recipeId,
          },
        });
        return redirect("/user/imported");
      }
      case "POST": {
        invariant(typeof url === "string", "Missing url");
        invariant(typeof recipeId === "string", "Invalid RecipeID");
        const recipe = await recipeDataScraper(url);
        const importedRecipe = await prisma.importedRecipe.create({
          data: {
            name: recipe.name,
            description: recipe.description,
            recipeYield: recipe.recipeYield,
            totalTime: recipe.totalTime,
            image: typeof recipe.image === "string" ? recipe.image : JSON.stringify(recipe.image),
            url,
            cookTime: recipe.cookTime,
            prepTime: recipe.prepTime,
            recipeCategories: {
              connectOrCreate: recipe.recipeCategories.map((category) => ({
                create: {
                  name: category,
                },
                where: {
                  name: category,
                },
              })),
            },
            user: {
              connect: {
                id: user.id,
              },
            },
          },
        });
        return redirect(`/recipes/imported/${importedRecipe.id}`);
      }
      default: {
        return redirect("/", { status: 405 });
      }
    }
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return typedjson({ error: "Recipe already exists" });
      }
      return typedjson({ error });
    }
    return typedjson({ error: "Something went wrong" });
  }
};

export const loader = async ({ params, request }: LoaderArgs) => {
  const user = await requireUser(request);
  const importedRecipes = await prisma.importedRecipe.findMany({
    where: { user: { id: user.id } },
  });
  if (!importedRecipes) return typedjson({ importedRecipes: [] });

  return typedjson({ importedRecipes });
};

const UserImportedPage = () => {
  const fetcher = useTypedFetcher<typeof action>();
  const isError = fetcher.data?.error;
  const { importedRecipes } = useTypedLoaderData<typeof loader>();
  const inputRef = useRef<HTMLInputElement>(null);
  const isLoading = fetcher.state === "submitting";
  const count = importedRecipes.length;
  const inputStyles = clsx("input input-bordered w-full max-w-md", {
    "input-error": isError,
  });

  function clearInput() {
    if (inputRef.current) inputRef.current.value = "";
    fetcher.load("/resource/imported");
  }

  console.log(fetcher.data?.error);

  useEffect(() => {
    if (isError)
      toast(
        "Failed to import recipe. Check the error message under the field or in the browser console",
        { type: "error", theme: "dark" },
      );
  }, [isError]);

  return (
    <>
      <Container>
        <div className="text-xl mb-5">
          You currently have <strong> {count} </strong> imported recipes!
        </div>
        <GridSizeSelect />
        <fetcher.Form className="mb-4 w-full max-w-md" method="post" action="/resource/imported">
          <label className="label input-group">
            <button type="button" className="btn btn-square" title="Clear" onClick={clearInput}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            <input
              ref={inputRef}
              placeholder="Import a recipe from a URL"
              type="text"
              className={inputStyles}
              name="url"
              disabled={isLoading}
              required
            />
            <button type="submit" className="btn btn-primary" disabled={isLoading}>
              Import
            </button>
          </label>
          {isError && typeof fetcher.data.error === "string" && (
            <p className="text-center text-red-700">{fetcher.data.error}</p>
          )}
        </fetcher.Form>
        <RecipeGrid>
          {importedRecipes.map((recipe) => (
            <ImportedRecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </RecipeGrid>
      </Container>
    </>
  );
};

export default UserImportedPage;

export const CatchBoundary = () => {
  const caught = useCatch();
  console.log(caught);

  return (
    <div className="container mx-auto max-w-2xl min-h-screen">
      <h1>Oh no</h1>
      <pre>{JSON.stringify(caught, null, 2)}</pre>
    </div>
  );
};

export const ErrorBoundary: ErrorBoundaryComponent = ({ error }) => {
  console.log(error);
  return (
    <div className="container mx-auto max-w-2xl min-h-screen">
      <h1>Oh no</h1>
      <pre>{JSON.stringify(error, null, 2)}</pre>
    </div>
  );
};
