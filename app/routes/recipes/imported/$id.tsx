import { Response } from "@remix-run/node";
import type { LoaderArgs } from "@remix-run/server-runtime";
import { typedjson, useTypedLoaderData } from "remix-typedjson";
import invariant from "tiny-invariant";
import { getImportedRecipeById } from "~/db/getImportedRecipeById.server";

export const loader = async ({ params }: LoaderArgs) => {
  const id = params.id;
  invariant(id, "id is required");
  const recipe = await getImportedRecipeById(id);
  if (!recipe) throw new Response("Recipe not found", { status: 404 });
  return typedjson(recipe);
};

const ImportedRecipePage = () => {
  const data = useTypedLoaderData<typeof loader>();

  return (
    <>
      <div
        className="hero h-96"
        style={{ backgroundImage: `url(${data.image})`, backgroundSize: "cover" }}
      >
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-xl">
            <h1 className="mb-5 text-5xl font-bold">{data.name}</h1>
            <p className="mb-5">{data.description}</p>
          </div>
        </div>
      </div>
      <div className="max-w-4xl m-auto flex">
        <div className="flex-1">
          <div className="flex justify-between items-center mt-6">
            <div className="flex">Cook time: {data.cookTime}</div>
            <div className="flex">Prep time: {data.prepTime}</div>
            <div className="flex">Total time: {data.totalTime}</div>
          </div>

          <div className="mt-6">
            <h2 className="text-2xl font-bold">Ingredients</h2>
            <ul className="list-disc list-inside">
              {data.recipeIngredients.map((ingredient) => (
                <li key={ingredient.name}>{ingredient.name}</li>
              ))}
            </ul>

            <h2 className="text-2xl font-bold mt-6">Instructions</h2>
            <ol className="list-decimal list-inside">
              {data.recipeInstructions.map((instruction) => (
                <li key={instruction.index}>{instruction.caption}</li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </>
  );
};

export default ImportedRecipePage;
