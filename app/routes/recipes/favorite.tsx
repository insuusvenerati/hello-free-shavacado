import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import type { ActionArgs } from "@remix-run/server-runtime";
import { typedjson } from "remix-typedjson";
import invariant from "tiny-invariant";
import { prisma } from "~/db.server";
import { getUserFavorites } from "~/db/getUserFavorites.server";
import { requireUser } from "~/session.server";

export const action = async ({ request }: ActionArgs) => {
  const method = request.method;
  const user = await requireUser(request);
  const formData = await request.formData();
  const id = formData.get("query");

  invariant(typeof id === "string", "Missing id");

  try {
    if (method === "DELETE") {
      const result = await prisma.favoriteRecipe.delete({
        where: {
          recipeId: id,
        },
      });
      return typedjson({ result, status: "success", method }, { status: 200 });
    }
    const existingFavorites = await getUserFavorites(user.id);

    if (existingFavorites.some((favorite) => favorite.recipeId === id)) {
      return typedjson({ result: "Already favorited", status: "error", method });
    }
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
    return typedjson({ result, status: "success", method }, { status: 201 });
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      return typedjson({ result: error.message, status: "error", method });
    }
    return typedjson({ result: JSON.stringify(error), status: "error", method });
  }
};
