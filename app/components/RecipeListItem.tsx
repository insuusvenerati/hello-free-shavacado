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
    <li className="p-3 max-w-sm sm:py-4 shadow-md rounded-md bg-secondary" {...props}>
      <div className="flex items-center space-x-4">
        <div className="flex-shrink-0">
          <img
            className="w-12 h-12 rounded-full hover:scale-110 cursor-pointer"
            src={`${HF_AVATAR_IMAGE_URL}${recipe.imagePath}`}
            alt={recipe.name}
            onClick={() => navigate(`/recipes/${recipe.id}`)}
            onKeyDown={() => navigate(`/recipes/${recipe.id}`)}
          />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium truncate">{recipe.name}</p>
          <p className="text-sm text-gray-500 truncate text-ellipsis">{recipe.description}</p>
        </div>
        <div className="inline-flex items-center text-base font-semibold">
          <AddToFavoritesButton onlyIcon name={recipe.name} id={recipe.id} />
        </div>
      </div>
    </li>
  );
};
