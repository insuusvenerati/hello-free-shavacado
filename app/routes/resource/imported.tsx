import { Prisma } from "@prisma/client";
import type { ActionArgs } from "@remix-run/server-runtime";
import recipeDataScraper from "recipe-data-scraper";
import { redirect, typedjson } from "remix-typedjson";
import invariant from "tiny-invariant";
import { prisma } from "~/db.server";
import { requireUser } from "~/session.server";

// export const loader = async ({ request }: LoaderArgs) => {
//   if (request.method !== "POST") return redirect("/", { status: 405 });
// };

export const action = async ({ request }: ActionArgs) => {
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
      return typedjson({ error: error.message });
    }
    if (error instanceof Error) {
      return typedjson({ error: error.message });
    }
    return typedjson({ error: "Unknown error" });
  }
};
