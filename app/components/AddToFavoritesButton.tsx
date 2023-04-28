import { useCallback, useEffect, useMemo } from "react";
import { toast } from "react-toastify";
import { useTypedFetcher } from "remix-typedjson";
import type { action } from "~/routes/recipes.favorite";
import { cn, useMatchesData } from "~/utils";
import { TrashIcon } from "./TrashIcon";

type Props = {
  id: string | undefined;
  name: string | undefined;
  onlyIcon?: boolean;
};

type FavoritesLoaderData = {
  favorites:
    | {
        recipe: {
          id: string;
        };
      }[]
    | undefined;
};

export const AddToFavoritesButton = ({ id, name, onlyIcon = false }: Props) => {
  const { favorites } = useMatchesData<FavoritesLoaderData>("root");
  const { state, submit, data } = useTypedFetcher<typeof action>();

  const isFavorite = useMemo(() => {
    return favorites?.some((favorite) => favorite.recipe.id === id);
  }, [favorites, id]);

  const isDone = state === "idle" && data != null;
  const isError = isDone && data.ok === "false";

  const buttonStyles = cn("btn btn-primary w-full btn-sm", {
    "btn-success": isFavorite,
    loading: state === "submitting",
    "btn-error": isError,
  });

  const buttonText = isFavorite ? "Added" : "Add to favorites";
  const handleToast = useCallback(() => {
    if (isError) toast("Error adding to favorites", { theme: "dark" });
    if (isDone)
      toast(isFavorite ? "Added to favorites" : "Removed from favorites", { theme: "dark" });
  }, [isDone, isError, isFavorite]);

  useEffect(() => {
    handleToast();
  }, [handleToast, state]);

  if (!id || !name) return null;

  const handleAddToFavorites = (method: "POST" | "DELETE") => {
    submit({ id, name }, { method, action: "/recipes/favorite" });
  };

  return (
    <div className="btn-group flex">
      {!onlyIcon && (
        <button
          type="button"
          disabled={isFavorite}
          onClick={() => handleAddToFavorites("POST")}
          className={buttonStyles}
        >
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-6 w-6"
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
          onClick={() => handleAddToFavorites("DELETE")}
          className="btn-error btn-sm btn"
        >
          <TrashIcon />
        </button>
      ) : null}
    </div>
  );
};
