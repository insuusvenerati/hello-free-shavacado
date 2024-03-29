import type { Recipe, Tag } from "@prisma/client";
import { Link } from "@remix-run/react";
import type { Hit } from "instantsearch.js";
import { HF_CARD_IMAGE_URL } from "~/constants";
import { AddToFavoritesButton } from "~/routes/recipes/favorite";
import type { RecipeHit } from "~/types/recipe";

type Props = {
  recipe:
    | Hit<RecipeHit>
    | (Recipe & {
        tags: Tag[];
      });
} & React.HTMLAttributes<HTMLDivElement>;

export const RecipeCard = ({ recipe, ...props }: Props) => {
  return (
    <div className="card-compact card h-auto w-auto bg-zinc-800 shadow-lg" {...props}>
      <Link to={`/recipes/${recipe.id}`}>
        <figure className="cursor-pointer rounded-t-xl">
          <img
            src={`${HF_CARD_IMAGE_URL}${recipe.imagePath}`}
            alt={recipe.name}
            className="w-full object-cover transition-all duration-100 hover:scale-105"
          />
        </figure>
      </Link>
      <div className="card-body justify-between">
        <div className="card-title text-sm">{recipe.name}</div>
        {/* <p>{recipe.description?.slice(0, 100)}...</p> */}
        <div className="btn-group">
          {recipe.tags
            ?.map((tag) => (
              <button key={tag.id} className="btn btn-xs">
                {tag.name}
              </button>
            ))
            .slice(0, 2)}
        </div>

        <div className="card-actions">
          <AddToFavoritesButton id={recipe.id} />
        </div>
      </div>
    </div>
  );
};
