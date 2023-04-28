import { Link } from "@remix-run/react";
import { HF_CARD_IMAGE_URL } from "~/constants";
import type { getUserFavorites } from "~/db/getUserFavorites.server";
import type { getAllDbRecipes } from "~/models/recipe.server";
import { AddToFavoritesButton } from "./AddToFavoritesButton";

type Props = {
  recipe:
    | Awaited<ReturnType<typeof getUserFavorites>>[number]["recipe"]
    | Awaited<ReturnType<typeof getAllDbRecipes>>[number];
} & React.HTMLAttributes<HTMLDivElement>;

export const RecipeCard = ({ recipe, ...props }: Props) => {
  return (
    <div
      className="card-compact card h-auto w-auto overflow-hidden rounded-md bg-base-300"
      {...props}
    >
      <Link to={`/recipes/${recipe.id}`}>
        <figure className="cursor-pointer">
          <img
            src={`${HF_CARD_IMAGE_URL}${recipe.imagePath}`}
            alt={recipe.name}
            className="w-full rounded-t-md object-cover"
            width={600}
            height={340}
          />
        </figure>
      </Link>
      <div className="card-body justify-between">
        <div className="card-title text-sm">{recipe.name}</div>
        <div className="btn-group">
          {recipe.tags
            ?.map((tag) => (
              <Link to={`?tag=${tag.name}`} key={tag.id} className="btn-xs btn">
                {tag.name}
              </Link>
            ))
            .slice(0, 2)}
        </div>

        <div className="card-actions">
          <AddToFavoritesButton name={recipe.name} id={recipe.id} />
        </div>
      </div>
    </div>
  );
};
