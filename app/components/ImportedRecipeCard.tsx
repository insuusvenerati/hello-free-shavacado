import type { ImportedRecipe } from "@prisma/client";
import { Link } from "@remix-run/react";
import { useTypedFetcher } from "remix-typedjson";
import type { action } from "~/routes/resource.imported";
import { RemixImage } from "./RemixImage";
import { TrashIcon } from "./TrashIcon";

type Props = {
  recipe: ImportedRecipe;
};

export const ImportedRecipeCard = ({ recipe }: Props) => {
  const fetcher = useTypedFetcher<typeof action>();

  return (
    <div className="card card-compact h-auto w-auto max-w-md bg-transparent">
      <Link to={`/recipes/imported/${recipe.id}`}>
        <figure className="cursor-pointer">
          <RemixImage
            src={recipe.image ?? "http://placeimg.com/600/340/nature"}
            alt={recipe.name}
            className="w-full object-cover transition-all duration-100 hover:scale-105"
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
      <div className="card-body">
        <h2 className="card-title">{recipe.name}</h2>
        <div className="card-actions">
          <fetcher.Form method="delete" action="/user/imported">
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
