import { Response } from "@remix-run/node";
import type { LoaderArgs } from "@remix-run/server-runtime";
import type { TypedMetaFunction } from "remix-typedjson";
import { typedjson, useTypedLoaderData } from "remix-typedjson";
import invariant from "tiny-invariant";
import { ShareButton } from "~/components/common/ShareButton";
import { getImportedRecipeById } from "~/db/getImportedRecipeById.server";

export const loader = async ({ params, request }: LoaderArgs) => {
  const url = request.url;
  const id = params.id;
  invariant(id, "id is required");
  const recipe = await getImportedRecipeById(id);
  if (!recipe) throw new Response("Recipe not found", { status: 404 });
  return typedjson({ recipe, url });
};

export const meta: TypedMetaFunction<typeof loader> = ({ data }) => {
  return {
    title: data.recipe.name,
    description: data.recipe.description,
    "og:title": data.recipe.name,
    "og:description": data.recipe.description,
    "og:image": data.recipe.image,
  };
};
const ImportedRecipePage = () => {
  const { recipe, url } = useTypedLoaderData<typeof loader>();

  return (
    <>
      <div
        className="hero h-96"
        style={{ backgroundImage: `url(${recipe.image})`, backgroundSize: "cover" }}
      >
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-xl">
            <h1 className="mb-5 text-5xl font-bold">{recipe.name}</h1>
            <p className="mb-5">{recipe.description}</p>
          </div>
        </div>
      </div>
      <div className="m-auto flex max-w-4xl">
        <div className="flex-1">
          <div className="mt-6 flex items-center justify-between">
            <div className="flex">Cook time: {recipe.cookTime}</div>
            <div className="flex">Prep time: {recipe.prepTime}</div>
            <div className="flex">Total time: {recipe.totalTime}</div>
            <ShareButton
              className="btn-sm btn"
              title={recipe.name}
              text={recipe.description ?? "Probably a good recipe but with no description"}
              url={url}
            >
              Share
            </ShareButton>

            <a target="_blank" className="link" href={recipe.url} rel="noreferrer">
              Link
            </a>
          </div>

          <div className="mb-20 mt-6">
            <h2 className="text-2xl font-bold">Ingredients</h2>
            <ul className="list-inside list-disc">
              {recipe.recipeIngredients.map((ingredient) => (
                <li key={ingredient.name}>{ingredient.name}</li>
              ))}
            </ul>

            <h2 className="mt-6 text-2xl font-bold">Instructions</h2>
            <ol className="list-inside list-decimal">
              {recipe.recipeInstructions.map((instruction) => (
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
