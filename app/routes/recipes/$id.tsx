import { Response } from "@remix-run/node";
import { useCatch } from "@remix-run/react";
import type { LoaderArgs } from "@remix-run/server-runtime";
import type { CatchBoundaryComponent } from "@remix-run/server-runtime/dist/routeModules";
import { typedjson, useTypedLoaderData } from "remix-typedjson";
import invariant from "tiny-invariant";
import { HF_COVER_IMAGE_URL } from "~/constants";
import { getRecipeById } from "~/db/getRecipeById.server";

export const loader = async ({ request, params }: LoaderArgs) => {
  const id = params.id;
  invariant(id, "id is required");
  const recipe = await getRecipeById(id);
  if (!recipe) {
    throw new Response("Recipe not found", { status: 404 });
  }
  return typedjson(recipe);
};

const RecipePage = () => {
  const data = useTypedLoaderData<typeof loader>();

  return (
    <>
      <div
        className="hero h-auto"
        style={{ backgroundImage: `url(${HF_COVER_IMAGE_URL}${data.imagePath})` }}
      >
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-xl">
            <h1 className="mb-5 text-5xl font-bold">{data.name}</h1>
            <p className="mb-5">{data.description}</p>
          </div>
        </div>
        {/* TODO: Add tags, allergens, etc. */}
      </div>
      <main className="container mx-auto mt-4 gap-4 flex flex-col">
        <div className="flex flex-col">
          <h2 className="text-2xl font-bold">Allergens</h2>
          <ul>
            {data.allergens.map((allergen) => (
              <li key={allergen.id}>{allergen.name}</li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-bold">Tags</h2>
          <ul>
            {data.tags.map((tag) => (
              <li key={tag.id}>{tag.name}</li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-bold">Ingredients</h2>
          <ul>
            {data.ingredients.map((ingredient) => (
              <li key={ingredient.id}>{ingredient.name}</li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-4">Steps</h2>
          <ol className="ml-4">
            {data.steps.map((step) => (
              <li className="mb-4" key={step.index}>{`${step.index}) ${step.instructions}`}</li>
            ))}
          </ol>
        </div>
      </main>
    </>
  );
};

export default RecipePage;

export const CatchBoundary: CatchBoundaryComponent = () => {
  const caught = useCatch();
  console.log(caught);
  return (
    <main className="container mx-auto">
      <h1 className="text-xl">{caught.data}</h1>
    </main>
  );
};
