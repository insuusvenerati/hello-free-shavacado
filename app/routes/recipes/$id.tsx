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
    <div className="grid grid-flow-row auto-rows-min gap-10">
      <div className="carousel w-full">
        <div className="carousel-item w-full">
          <img
            src={`${HF_COVER_IMAGE_URL}${data?.imagePath}`}
            alt={data?.name}
            className="h-auto w-full object-cover"
          />
        </div>
      </div>
      <div className="container mx-auto">
        <h1 className="text-2xl font-bold">{data?.name}</h1>
      </div>
      <div className="container mx-auto">
        <p className="text-sm">{data?.description}</p>
      </div>
      <div className="container mx-auto">
        <div className="tabs">
          <a className="tab tab-bordered">Tab 1</a>
          <a className="tab tab-bordered tab-active">Tab 2</a>
          <a className="tab tab-bordered">Tab 3</a>
          <a className="tab tab-bordered">Tab 3</a>
          <a className="tab tab-bordered">Tab 3</a>
          <a className="tab tab-bordered">Tab 3</a>
        </div>
      </div>
    </div>
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
