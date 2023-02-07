import type { Recipe, Tag } from "@prisma/client";
import { Link } from "@remix-run/react";
import { HF_CARD_IMAGE_URL } from "~/constants";
import { AddToFavoritesButton } from "./AddToFavoritesButton";

type Props = {
  recipe: Recipe & {
    tags: Tag[];
  };
} & React.HTMLAttributes<HTMLDivElement>;

export const RecipeCard = ({ recipe, ...props }: Props) => {
  return (
    <div className="card-compact card h-auto w-auto bg-base-300 rounded-md" {...props}>
      <Link to={`/recipes/${recipe.id}`}>
        <figure className="cursor-pointer">
          <img
            src={`${HF_CARD_IMAGE_URL}${recipe.imagePath}`}
            alt={recipe.name}
            className="w-full object-cover transition-all duration-100 hover:scale-105 rounded-md"
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
