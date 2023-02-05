import { Prisma } from "@prisma/client";
import { useCatch } from "@remix-run/react";
import type { ActionArgs, ErrorBoundaryComponent, LoaderArgs } from "@remix-run/server-runtime";
import clsx from "clsx";
import { useRef } from "react";
import { redirect, typedjson, useTypedFetcher, useTypedLoaderData } from "remix-typedjson";
import invariant from "tiny-invariant";
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
        const recipe = await recipeDataScraper(url);
        // debug(recipe);
        const importedRecipe = await prisma.importedRecipe.create({
          data: {
            ...recipe,
            image: typeof recipe.image === "object" ? recipe.image.url : recipe.image,
            description: recipe.description ?? null,
            keywords: {
              connectOrCreate: recipe.keywords?.map((keyword) => ({
                where: { name: keyword },
                create: {
                  name: keyword,
                },
              })),
            },
            recipeInstructions: {
              create: recipe.recipeInstructions?.map((instruction, index) => ({
                caption: instruction,
                index: index,
              })),
            },
            recipeIngredients: {
              connectOrCreate: recipe.recipeIngredients?.map((ingredient) => ({
                where: { name: ingredient },
                create: {
                  name: ingredient,
                },
              })),
            },
            recipeCuisines: {
              connectOrCreate: recipe.recipeCuisines?.map((cuisine) => ({
                where: { name: cuisine },
                create: {
                  name: cuisine,
                },
              })),
            },
            recipeCategories: {
              connectOrCreate: recipe.recipeCategories?.map((category) => ({
                where: { name: category },
                create: {
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

  return (
    <>
      <main className="flex flex-col items-center p-1 lg:p-5">
        <div className="text-xl mb-5">
          You currently have <strong> {count} </strong> imported recipes!
        </div>
        <fetcher.Form className="mb-4 w-full max-w-md" method="post" action="/resource/imported">
          <label className="label input-group">
            <button
              type="button"
              className="btn btn-square"
              title="Clear"
              onClick={() => {
                if (inputRef.current) inputRef.current.value = "";
              }}
            >
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
            <p className="text-center">{fetcher.data.error}</p>
          )}
        </fetcher.Form>
        {/** Centered Recipe card grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {importedRecipes.map((recipe) => (
            <ImportedRecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      </main>
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
