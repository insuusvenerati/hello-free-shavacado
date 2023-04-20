import { Link } from "@remix-run/react";
import { HF_CARD_IMAGE_URL } from "~/constants";
import type { getUserFavorites } from "~/db/getUserFavorites.server";
import type { getAllDbRecipes } from "~/models/recipe.server";
import { AddToFavoritesButton } from "./AddToFavoritesButton";
import { RemixImage } from "./RemixImage";

type Props = {
  recipe:
    | Awaited<ReturnType<typeof getUserFavorites>>[number]["recipe"]
    | Awaited<ReturnType<typeof getAllDbRecipes>>[number];
} & React.HTMLAttributes<HTMLDivElement>;

export const RecipeCard = ({ recipe, ...props }: Props) => {
  return (
    <div
      className="card-compact card h-auto w-auto overflow-hidden rounded-md bg-base-300 shadow-md transition-all duration-200 hover:scale-105"
      {...props}
    >
      <Link to={`/recipes/${recipe.id}`}>
        <figure className="cursor-pointer">
          <RemixImage
            src={`${HF_CARD_IMAGE_URL}${recipe.imagePath}`}
            transformOptions={{ fit: "cover", quality: 20 }}
            alt={recipe.name}
            className="w-full rounded-t-md object-cover"
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
