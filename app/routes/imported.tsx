import { Form, useCatch, useTransition } from "@remix-run/react";
import type { ActionArgs, LoaderArgs } from "@remix-run/server-runtime";
import recipeDataScraper from "recipe-data-scraper";
import { typedjson, useTypedLoaderData } from "remix-typedjson";
import invariant from "tiny-invariant";
import { ImportedRecipeCard } from "~/components/ImportedRecipeCard";
import { prisma } from "~/db.server";
import { requireUser } from "~/session.server";

export const loader = async ({ request }: LoaderArgs) => {
  const user = await requireUser(request);
  const recipes = await prisma.importedRecipe.findMany({
    where: {
      userId: user.id,
    },
    include: {
      recipeCategories: true,
      recipeCuisines: true,
      recipeIngredients: true,
      recipeInstructions: true,
      keywords: true,
    },
  });
  return typedjson(recipes);
};

export const action = async ({ request }: ActionArgs) => {
  const user = await requireUser(request);
  const formData = await request.formData();
  const url = formData.get("url");
  const intent = formData.get("intent");
  const recipeId = formData.get("recipeId");

  try {
    if (intent === "delete") {
      invariant(typeof recipeId === "string", "Missing recipeId");
      return typedjson(
        await prisma.importedRecipe.delete({
          where: {
            id: recipeId,
          },
        }),
      );
    }
    invariant(typeof url === "string", "Missing url");
    const recipe = await recipeDataScraper(url);
    return typedjson(
      await prisma.importedRecipe.create({
        data: {
          ...recipe,
          keywords: {
            connectOrCreate: recipe.keywords.map((keyword) => ({
              where: { name: keyword },
              create: {
                name: keyword,
              },
            })),
          },
          recipeInstructions: {
            create: recipe.recipeInstructions.map((instruction, index) => ({
              caption: instruction,
              index: index,
            })),
          },
          recipeIngredients: {
            connectOrCreate: recipe.recipeIngredients.map((ingredient) => ({
              where: { name: ingredient },
              create: {
                name: ingredient,
              },
            })),
          },
          recipeCuisines: {
            connectOrCreate: recipe.recipeCuisines.map((cuisine) => ({
              where: { name: cuisine },
              create: {
                name: cuisine,
              },
            })),
          },
          recipeCategories: {
            connectOrCreate: recipe.recipeCategories.map((category) => ({
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
      }),
    );
  } catch (error) {
    if (error instanceof Error) {
      throw new Response(error.message, { status: 400 });
    }
    throw new Response("Something went wrong", { status: 500 });
  }
};

const ImportedRecipesPage = () => {
  const recipes = useTypedLoaderData<typeof loader>();
  const transition = useTransition();

  return (
    <>
      <div className="container mx-auto h-screen p-10">
        <h1 className="mb-10 text-center text-5xl">Imported Recipes</h1>
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
          <Form
            className="col-span-3 grid w-full max-w-lg justify-self-center form-control"
            method="post"
            action="/imported"
          >
            <label className="label" htmlFor="url">
              <span className="label-text">Import recipe</span>
            </label>
            <label className="input-group">
              <input
                placeholder="https://allrecipes.com/recipe/12345"
                type="text"
                className="input w-full max-w-lg bg-white"
                name="url"
                disabled={transition.state !== "idle"}
              />
              {transition.state !== "idle" && (
                <span>
                  <div
                    className="animate-spin block w-8 h-8 border-4 border-t-blue-300 rounded-full"
                    role="status"
                  />
                </span>
              )}
            </label>
          </Form>
          {recipes.map((recipe) => (
            <ImportedRecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      </div>
    </>
  );
};
export default ImportedRecipesPage;

export const CatchBoundary = () => {
  const caught = useCatch();

  return (
    <div className="container mx-auto max-w-2xl min-h-screen">
      <h1>Oh no</h1>
      <pre>{JSON.stringify(caught, null, 2)}</pre>
    </div>
  );
};
