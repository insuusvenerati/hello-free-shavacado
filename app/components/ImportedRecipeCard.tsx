import type { ImportedRecipe } from "@prisma/client";
import { Link } from "@remix-run/react";
import { useTypedFetcher } from "remix-typedjson";
import { TrashIcon } from "./TrashIcon";
import type { action } from "~/routes/resource+/imported";

type Props = {
  recipe: ImportedRecipe;
};

export const ImportedRecipeCard = ({ recipe }: Props) => {
  const fetcher = useTypedFetcher<typeof action>();

  return (
    <div className="card-compact card h-auto w-auto overflow-hidden rounded-md bg-base-300">
      <Link to={`/recipes/imported/${recipe.id}`}>
        <figure className="cursor-pointer">
          <img
            src={recipe.image ?? "http://placeimg.com/600/340/nature"}
            alt={recipe.name}
            className="w-full object-cover transition-all duration-100 hover:scale-105"
            width={600}
            height={340}
          />
        </figure>
      </Link>
      <div className="card-body">
        <div className="card-title">{recipe.name}</div>
        <div className="card-actions">
          <fetcher.Form method="DELETE" action="/user/imported">
            <input type="hidden" name="recipeId" value={recipe.id} />
            <button type="submit" className="btn-error btn gap-2">
              <TrashIcon /> <span>Delete</span>
            </button>
          </fetcher.Form>
        </div>
      </div>
    </div>
  );
};
