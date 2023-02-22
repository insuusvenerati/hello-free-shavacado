import type { Recipe, Tag } from "@prisma/client";
import { Link } from "@remix-run/react";
import type { SerializeFrom } from "@remix-run/server-runtime";
import { HF_CARD_IMAGE_URL } from "~/constants";
import type { Item } from "~/types/recipe";
import { AddToFavoritesButton } from "./AddToFavoritesButton";
import { RemixImage } from "./RemixImage";

type RecipeWithTags = Recipe & {
  tags: Tag[];
};

type Props = {
  recipe: SerializeFrom<Item> | RecipeWithTags;
} & React.HTMLAttributes<HTMLDivElement>;

export const RecipeCard = ({ recipe, ...props }: Props) => {
  return (
    <div
      className="overflow-hidden card-compact card h-auto shadow-md w-auto bg-base-300 rounded-md duration-300 hover:-translate-y-1"
      {...props}
    >
      <Link to={`/recipes/${recipe.name}`}>
        <figure className="cursor-pointer">
          <RemixImage
            src={`${HF_CARD_IMAGE_URL}${recipe.imagePath}`}
            transformOptions={{ fit: "cover", quality: 20 }}
            alt={recipe.name}
            className="w-full object-cover rounded-t-md"
            width={600}
            height={340}
            responsive={[
              {
                size: {
                  width: 600,
                  height: 340,
                },
                maxWidth: 600,
              },
            ]}
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
          <AddToFavoritesButton name={recipe.name} id={recipe.id} />
        </div>
      </div>
    </div>
  );
};
