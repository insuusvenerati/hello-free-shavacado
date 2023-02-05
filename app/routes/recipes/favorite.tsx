import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import type { ActionArgs } from "@remix-run/server-runtime";
import { typedjson } from "remix-typedjson";
import invariant from "tiny-invariant";
import { prisma } from "~/db.server";
import { getUserFavorites } from "~/db/getUserFavorites.server";
import { requireUser } from "~/session.server";

export const action = async ({ request }: ActionArgs) => {
  const user = await requireUser(request);
  const formData = await request.formData();
  const id = formData.get("query");
  const intent = formData.get("intent");

  invariant(typeof id === "string", "Missing id");
  const existingFavorites = await getUserFavorites(user.id);

  if (existingFavorites.some((favorite) => favorite.recipeId === id)) {
    return typedjson({ result: "Already favorited", status: "error" });
  }

  try {
    if (intent === "delete") {
      return await prisma.favoriteRecipe.delete({
        where: {
          recipeId: id,
        },
      });
    }
    return await prisma.favoriteRecipe.upsert({
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
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      return typedjson({ result: error.message, status: "error" });
    }
  }
};
