import { useEffect, useMemo } from "react";
import { toast } from "react-toastify";
import { useTypedFetcher } from "remix-typedjson";
import type { action } from "~/routes/recipes.favorite";
import type { FavoritesWithRecipeAndId } from "~/types/favorites";
import { cn, useMatchesData } from "~/utils";
import { TrashIcon } from "./TrashIcon";

type Props = {
  id: string | undefined;
  name: string | undefined;
  onlyIcon?: boolean;
};

export const AddToFavoritesButton = ({ id, name, onlyIcon = false, ...props }: Props) => {
  const favorites = useMatchesData<{ favoriteRecipes: FavoritesWithRecipeAndId }>(
    "root",
  )?.favoriteRecipes;

  const isFavorite = useMemo(() => {
    if (typeof favorites === "undefined") return false;
    if (favorites.length === 0) return false;
    return favorites.some((favorite) => favorite.recipe.id === id);
  }, [favorites, id]);

  const addToFavorites = useTypedFetcher<typeof action>();
  const loading = addToFavorites.state === "submitting";
  const isError = addToFavorites.data?.ok === "false";
  const isDeletedSuccess =
    addToFavorites.data?.method === "DELETE" && addToFavorites.data?.ok === "true";
  const isSuccess =
    addToFavorites.type === "done" &&
    addToFavorites.data?.ok === "true" &&
    !isError &&
    addToFavorites.data?.method !== "DELETE";

  const buttonStyles = cn("btn btn-primary w-full btn-sm", {
    "btn-success": isFavorite,
    loading,
    "btn-error": isError,
  });

  useEffect(() => {
    isError && toast("Error adding to favorites", { theme: "dark" });
    isSuccess && toast("Added to favorites", { theme: "dark" });
    isDeletedSuccess && toast("Removed from favorites", { theme: "dark" });
  }, [isDeletedSuccess, isError, isSuccess]);

  const buttonText = useMemo(() => {
    if (isFavorite) return "Added";
    return "Add to favorites";
  }, [isFavorite]);

  if (!id || !name) return null;

  return (
    <div className="btn-group flex">
      {!onlyIcon && (
        <button
          type="button"
          disabled={isFavorite}
          onClick={() =>
            addToFavorites.submit({ id, name }, { method: "post", action: "/recipes/favorite" })
          }
          className={buttonStyles}
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
      )}
      {isFavorite ? (
        <button
          title="Remove from favorites"
          type="button"
          onClick={() =>
            addToFavorites.submit({ id, name }, { method: "delete", action: "/recipes/favorite" })
          }
          className="btn btn-error btn-sm"
        >
          <TrashIcon />
        </button>
      ) : null}
    </div>
  );
};
