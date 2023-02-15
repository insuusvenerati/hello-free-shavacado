import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import type { ActionArgs } from "@remix-run/server-runtime";
import { typedjson } from "remix-typedjson";
import invariant from "tiny-invariant";
import { prisma } from "~/db.server";
import { addRecipe } from "~/db/addRecipe.server";
import { getRecipeById } from "~/db/getRecipeById.server";
import { getUserFavorites } from "~/db/getUserFavorites.server";
import { requireUser } from "~/session.server";

export const action = async ({ request }: ActionArgs) => {
  const method = request.method;
  const user = await requireUser(request);
  const formData = await request.formData();
  const id = formData.get("id");
  const name = formData.get("name");

  invariant(typeof id === "string", "Missing id");
  invariant(typeof name === "string", "Missing name");

  try {
    if (method === "DELETE") {
      const result = await prisma.favoriteRecipe.delete({
        where: {
          recipeId: id,
        },
      });
      return typedjson({ result, ok: "true", method });
    }
    const existingFavorites = await getUserFavorites(user.id);
    const recipe = await getRecipeById(id);

    if (existingFavorites.some((favorite) => favorite.recipeId === id)) {
      return typedjson({ result: "Already favorited", ok: "error", method });
    }
    if (recipe) {
      const result = await prisma.favoriteRecipe.upsert({
        where: {
          recipeId: id,
        },
        update: {
          user: {
            connect: {
              id: user.id,
            },
          },
        },
        create: {
          user: {
            connect: {
              id: user.id,
            },
          },
          recipe: {
            connect: {
              id,
            },
          },
        },
      });
      return typedjson({ result, ok: "true", method });
    }
    return await addRecipe({ name, id, userId: user.id });
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      return typedjson({ result: error.message, ok: "false", method });
    }
    return typedjson({ result: JSON.stringify(error), ok: "false", method });
  }
};
