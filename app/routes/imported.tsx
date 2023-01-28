import { useCatch } from "@remix-run/react";
import type { ActionArgs, LoaderArgs } from "@remix-run/server-runtime";
import recipeDataScraper from "recipe-data-scraper";
import { redirect, typedjson } from "remix-typedjson";
import invariant from "tiny-invariant";
import { prisma } from "~/db.server";
import { requireUser } from "~/session.server";

export const loader = async ({ request }: LoaderArgs) => {
  if(request.method !== "POST") return new Response("Method not allowed", { status: 405 })
};

export const action = async ({ request }: ActionArgs) => {

  const user = await requireUser(request);
  const formData = await request.formData();
  const url = formData.get("url");
  const intent = formData.get("intent");
  const recipeId = formData.get("recipeId");

  console.log(url, intent, recipeId);

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
    const importedRecipe = await prisma.importedRecipe.create({
      data: {
        ...recipe,
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
    })
    return redirect(`/recipes/imported/${importedRecipe.id}`);
  } catch (error) {
    if (error instanceof Error) {
      throw new Response(error.message, { status: 400 });
    }
    throw new Response("Something went wrong", { status: 500 });
  }
};

export const CatchBoundary = () => {
  const caught = useCatch();

  return (
    <div className="container mx-auto max-w-2xl min-h-screen">
      <h1>Oh no</h1>
      <pre>{JSON.stringify(caught, null, 2)}</pre>
    </div>
  );
};
