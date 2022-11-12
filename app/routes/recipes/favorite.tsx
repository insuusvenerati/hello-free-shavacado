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
      throw new Response(error.message, { status: 400 });
    }
    throw error;
  }
};

/**
 * @param {string} id Recipe ID, NOT favorite ID
 */
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
        type="button"
        disabled={isFavorite}
        onClick={() =>
          addToFavorites.submit({ query: id }, { method: "post", action: "/recipes/favorite" })
        }
        className={`btn btn-primary w-full btn-sm ${isFavorite ? "btn-success" : ""}  ${
          loading ? "loading" : ""
        } ${isError ? "btn-error" : ""}`}
      >
        <span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
            />
          </svg>
        </span>
        {buttonText}
      </button>
      {isFavorite ? (
        <button
          title="Remove from favorites"
          type="button"
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
