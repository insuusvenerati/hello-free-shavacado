import { Link } from "@remix-run/react";
import { ClockIcon, StarIcon } from "lucide-react";
import type { Item } from "~/types/recipe";
import { AddToFavoritesButton } from "./AddToFavoritesButton";

export const RecipeCardAlt = ({ recipes }: { recipes: Item[] }) => {
  return (
    <div className="flex flex-wrap">
      {recipes.map((recipe) => (
        <div
          key={recipe.id}
          className="flex flex-col justify-between w-full md:w-1/2 lg:w-1/3 xl:w-1/4"
        >
          <div className="flex flex-col justify-between w-full h-full p-4 bg-gray-100 rounded-md shadow">
            <div className="flex flex-col justify-between flex-1">
              <div className="flex flex-col justify-between flex-1">
                <h3 className="text-lg font-semibold">
                  <Link to={`/recipe/${recipe.id}`}>{recipe.name}</Link>
                </h3>
                <div className="flex flex-wrap">
                  {recipe.tags.map((tag) => (
                    <Link
                      key={tag.id}
                      to={`/recipes?search=${tag.name}`}
                      className="mr-1 text-sm text-gray-500 hover:text-gray-700"
                    >
                      {tag.name}
                    </Link>
                  ))}
                </div>
              </div>
              <div className="flex flex-wrap items-center justify-between mt-4">
                <span className="flex items-center text-sm text-gray-500">
                  <ClockIcon className="w-4 h-4 mr-1" />
                  {recipe.totalTime} min
                </span>
                <span className="flex items-center text-sm text-gray-500">
                  <StarIcon className="w-4 h-4 mr-1" />
                  {recipe.nutrition.map((n) => (
                    <span key={n.name}>
                      {n.name}: {n.amount} {n.unit}
                    </span>
                  ))}
                </span>
                <span className="flex items-center text-sm text-gray-500">
                  <StarIcon className="w-4 h-4 mr-1" />
                  {recipe.averageRating}
                </span>
              </div>
            </div>
            <div className="flex items-center justify-between mt-4">
              <AddToFavoritesButton id={recipe.id} name={recipe.name} onlyIcon />
              <Link to={`/recipe/${recipe.id}`} className="btn btn-primary btn-sm">
                View
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
