import type { ImportedRecipe } from "@prisma/client";
import { Link } from "@remix-run/react";

type Props = {
  recipe: ImportedRecipe;
};

export const ImportedRecipeCard = ({ recipe }: Props) => {
  return (
    <div className="card-compact card h-auto w-auto bg-zinc-800 shadow-lg">
      <Link to={`/recipes/imported/${recipe.id}`}>
        <figure className="cursor-pointer">
          <img
            src={"http://placeimg.com/1000/1000/nature"}
            alt={recipe.name}
            className="w-full object-cover transition-all duration-100 hover:scale-105"
          />
        </figure>
      </Link>
      <div className="card-body">
        <h2 className="card-title">{recipe.name}</h2>
        <p>{recipe.description}</p>
      </div>
    </div>
  );
};
