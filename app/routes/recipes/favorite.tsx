import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { Response } from "@remix-run/node";
import { useFetcher } from "@remix-run/react";
import type { ActionArgs } from "@remix-run/server-runtime";
import { useMemo } from "react";
import invariant from "tiny-invariant";
import { TrashIcon } from "~/components/TrashIcon";
import { prisma } from "~/db.server";
import { requireUser } from "~/session.server";
import type { FavoritesWithRecipeAndId } from "~/types/favorites";
import { useMatchesData } from "~/utils";

export const action = async ({ request }: ActionArgs) => {
  const user = await requireUser(request);
  const formData = await request.formData();
  const id = formData.get("query");
  const intent = formData.get("intent");

  invariant(typeof id === "string", "Missing id");
  try {
    if (intent === "delete") {
      return await prisma.favoriteRecipe.delete({
        where: {
          recipeId: id,
          userId: user.id,
        },
      });
    }
    return await prisma.favoriteRecipe.create({
      include: {
        recipe: true,
      },
      data: {
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
      throw new Response(error.message, { status: 400 });
    }
    throw error;
  }
};

export const AddToFavoritesButton = ({ id }: { id: string }) => {
  const favorites = useMatchesData<{ favoriteRecipes: FavoritesWithRecipeAndId }>(
    "root",
  )?.favoriteRecipes;

  const isFavorite =
    typeof favorites !== "undefined" &&
    favorites.length > 0 &&
    favorites.some((favorite) => favorite.recipe.id === id);

  const addToFavorites = useFetcher<typeof action>();
  const loading = addToFavorites.state !== "idle";
  const isError = typeof addToFavorites.data !== "undefined" && "statusText" in addToFavorites.data;
  const isSuccess = typeof addToFavorites.data !== "undefined" && !isError;
  const buttonText = useMemo(() => {
    if (isSuccess || isFavorite) return "Added";
    if (isError) return "Error adding to favorites";
    return "Add to favorites";
  }, [isError, isFavorite, isSuccess]);

  return (
    <div className="btn-group flex">
      <button
        disabled={isFavorite}
        onClick={() =>
          addToFavorites.submit({ query: id }, { method: "post", action: "/recipes/favorite" })
        }
        className={`btn btn-primary w-full btn-sm ${isFavorite ? "btn-success" : ""}  ${
          loading ? "loading" : ""
        } ${isError ? "btn-error" : ""}`}
      >
        {buttonText}
      </button>
      {isFavorite ? (
        <button
          onClick={() =>
            addToFavorites.submit(
              { query: id, intent: "delete" },
              { method: "post", action: "/recipes/favorite" },
            )
          }
          className="btn btn-error btn-sm"
        >
          <TrashIcon />
        </button>
      ) : null}
    </div>
  );
};
