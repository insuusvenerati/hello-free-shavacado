import { Response } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import type { LoaderArgs } from "@remix-run/server-runtime";
import { json } from "@remix-run/server-runtime";
import { prisma } from "~/db.server";

export const loader = async ({ params }: LoaderArgs) => {
  const id = params.id;
  const recipe = await prisma.importedRecipe.findUnique({
    where: { id },
  });
  if (!recipe) throw new Response("Recipe not found", { status: 404 });
  return json(recipe);
};

const ImportedRecipePage = () => {
  const data = useLoaderData<typeof loader>();
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
          <button
            tabIndex={0}
            className="collapse border collapse-arrow border-base-300 bg-base-300 rounded-box mt-6"
          >
            <div className="collapse-title text-xl font-medium">Description</div>
            <div className="collapse-content">
              <p>{data.description}</p>
            </div>
          </button>
        </div>
      </div>
    </>
  );
};

export default ImportedRecipePage;
