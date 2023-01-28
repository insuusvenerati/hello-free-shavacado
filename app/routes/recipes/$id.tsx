import { prisma } from "~/db.server";
import { Response } from "@remix-run/node";
import { useCatch, useLoaderData } from "@remix-run/react";
import type { LoaderArgs } from "@remix-run/server-runtime";
import { json } from "@remix-run/server-runtime";
import type { CatchBoundaryComponent } from "@remix-run/server-runtime/dist/routeModules";
import { HF_COVER_IMAGE_URL } from "~/constants";

export const loader = async ({ request, params }: LoaderArgs) => {
  const id = params.id;
  const recipe = await prisma.recipe.findUnique({
    include: {
      allergens: true,
      ingredients: true,
      category: true,
      tags: true,
      cuisines: true,
      steps: true,
    },
    where: {
      id,
    },
  });
  if (!recipe) {
    throw new Response("Recipe not found", { status: 404 });
  }
  return json(recipe);
};

const RecipePage = () => {
  const data = useLoaderData<typeof loader>();

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
      </div>
    </>
  );
};

export default RecipePage;

export const CatchBoundary: CatchBoundaryComponent = () => {
  const caught = useCatch();
  return (
    <main className="container mx-auto">
      <p>{caught.statusText}</p>
    </main>
  );
};
