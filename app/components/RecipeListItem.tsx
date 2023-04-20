/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { useNavigate } from "@remix-run/react";
import { HF_AVATAR_IMAGE_URL } from "~/constants";
import type { getUserFavorites } from "~/db/getUserFavorites.server";
import type { getAllDbRecipes } from "~/models/recipe.server";
import { AddToFavoritesButton } from "./AddToFavoritesButton";

type RecipeListItemProps = {
  recipe:
    | Awaited<ReturnType<typeof getUserFavorites>>[number]["recipe"]
    | Awaited<ReturnType<typeof getAllDbRecipes>>[number];
} & React.HTMLAttributes<HTMLLIElement>;

export const RecipeListItem = ({ recipe, ...props }: RecipeListItemProps) => {
  const navigate = useNavigate();
  return (
    <li className="max-w-sm rounded-md bg-secondary p-3 shadow-md sm:py-4" {...props}>
      <div className="flex items-center space-x-4">
        <div className="flex-shrink-0">
          <img
            className="h-12 w-12 cursor-pointer rounded-full hover:scale-110"
            src={`${HF_AVATAR_IMAGE_URL}${recipe.imagePath}`}
            alt={recipe.name}
            onClick={() => navigate(`/recipes/${recipe.id}`)}
            onKeyDown={() => navigate(`/recipes/${recipe.id}`)}
          />
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium">{recipe.name}</p>
          <p className="truncate text-ellipsis text-sm text-gray-500">{recipe.description}</p>
        </div>
        <div className="inline-flex items-center text-base font-semibold">
          <AddToFavoritesButton onlyIcon name={recipe.name} id={recipe.id} />
        </div>
      </div>
    </li>
  );
};
