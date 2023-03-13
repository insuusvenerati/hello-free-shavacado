import type { User } from "@prisma/client";
import { Response } from "@remix-run/node";
import { useCatch } from "@remix-run/react";
import type { LoaderArgs } from "@remix-run/server-runtime";
import type {
  CatchBoundaryComponent,
  V2_MetaFunction,
} from "@remix-run/server-runtime/dist/routeModules";
import { Clock, Star } from "lucide-react";
import { typedjson, useTypedLoaderData } from "remix-typedjson";
import invariant from "tiny-invariant";
import { AddToFavoritesButton } from "~/components/AddToFavoritesButton";
import { Container } from "~/components/common/Container";
import { ShareButton } from "~/components/common/ShareButton";
import { RemixImage } from "~/components/RemixImage";
import {
  HF_AVATAR_IMAGE_URL,
  HF_CARD_IMAGE_URL,
  HF_COVER_IMAGE_URL,
  INGREDIENT_PLACEHOLDER_URL,
} from "~/constants";
import { getDbRecipeById } from "~/models/recipe.server";
import { cn, useMatchesData } from "~/utils";

export const loader = async ({ request, params }: LoaderArgs) => {
  const id = params.id;
  invariant(id, "id is required");
  const url = new URL(request.url);

  // if (typeof token !== "string") {
  //   throw new Response("Unable to get recipe from API. Try again later", { status: 401 });
  // }

  try {
    const recipe = await getDbRecipeById(id);
    if (!recipe) {
      throw new Response("Recipe not found", { status: 404 });
    }
    return typedjson(
      { recipe, url },
      {
        headers: {
          "Cache-Control": "public, max-age=60, s-maxage=3600",
        },
      },
    );
  } catch (error) {
    console.log("Failed to retrieve recipe", error);
    throw new Response("Unable to retrieve recipe");
  }
};

export const meta: V2_MetaFunction<typeof loader> = ({ data }) => [
  {
    title: data.recipe.name,
    description: data.recipe.description,
    "og:description": data.recipe.description,
    "og:image": `${HF_CARD_IMAGE_URL}${data.recipe.imagePath}`,
    "og:url": "https://hello-free-shavacado-new.fly.dev/",
    "og:type": "website",
    "og:title": "Hello Free Shavacado",
    "twitter:card": "summary_large_image",
    "twitter:title": data.recipe.name,
    "twitter:description": data.recipe.description,
    "twitter:image": `${HF_CARD_IMAGE_URL}${data.recipe.imagePath}`,
  },
];

const RecipePage = () => {
  const { recipe, url } = useTypedLoaderData<typeof loader>();
  const { user } = useMatchesData<{ user: User }>("root");
  const userPageLayout = user?.recipePageLayout ?? "horizontal";
  const userColorScheme = user?.colorScheme ?? "dark";
  const pageLayout = cn("gap-4 pr-2", {
    "md:flex": userPageLayout === "vertical",
  });

  const collapseableStyles = cn("text-2xl font-bold mb-4 rounded collapse-title", {
    "bg-gray-900 text-gray-500": userColorScheme === "dark",
    "bg-gray-100 text-gray-900": userColorScheme === "light",
    "bg-primary-content": userColorScheme === "halloween",
    "bg-accent": userColorScheme === "cream",
  });

  const nutrition = JSON.parse(recipe.nutrition);

  return (
    <div className={pageLayout}>
      <div
        className="hero h-auto"
        style={{ backgroundImage: `url(${HF_COVER_IMAGE_URL}${recipe.imagePath})` }}
      >
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-xl">
            <h1 className="mb-5 text-5xl font-bold">{recipe.name}</h1>
            <p className="mb-5">{recipe.description}</p>
          </div>
        </div>
      </div>
      <main className="container mx-auto mt-4 gap-8 flex flex-col p-4">
        <div className="flex flex-col lg:flex-row justify-between gap-2">
          <div className="flex flex-col">
            <h2 className="text-2xl font-bold">Allergens</h2>
            <ul>
              {recipe.allergens.map((allergen) => (
                <li key={allergen.id}>{allergen.name}</li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col">
            <h2 className="text-2xl font-bold">Cuisines</h2>
            <ul>
              {recipe.cuisines.map((cuisine) => (
                <li key={cuisine.id}>{cuisine.name}</li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col">
            <h2 className="text-2xl font-bold">Category</h2>
            {recipe.category?.name ?? "No category"}
          </div>
          <div className="flex flex-col gap-4">
            <h2 className="text-2xl font-bold">Data</h2>
            <div className="flex gap-1 items-center">
              <h2 className="font-semibold">Total Time:</h2>
              <Clock className="w-4 h-4 mr-1" />
              {recipe.totalTime ?? 0} min
            </div>
            <div className="flex items-center">
              <h2 className="font-semibold mr-1">Rating:</h2>
              {recipe.averageRating &&
                Array.from({ length: recipe.averageRating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 mr-1" />
                ))}
            </div>

            <div className="flex gap-4">
              <h2 className="font-semibold">Difficulty:</h2>
              {recipe.difficulty}
            </div>
          </div>
          <div className="flex flex-col">
            <h2 className="text-2xl font-bold">Nutrition</h2>
            {nutrition.map((n: any) => (
              <span key={n.name}>
                {n.name}: {n.amount} {n.unit}
              </span>
            ))}
          </div>
          <div className="flex flex-col gap-4 max-w-xs">
            <AddToFavoritesButton id={recipe.id} name={recipe.name} />
            <ShareButton
              text={recipe.description.slice(0, 64)}
              title={recipe.name}
              url={url.href}
              className="btn btn-sm"
            >
              Share Recipe
            </ShareButton>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-4">Tags</h2>
          <ul className="flex gap-2">
            {recipe.tags.map((tag) => (
              <li className="badge badge-accent" key={tag.id}>
                {tag.name}
              </li>
            ))}
          </ul>
        </div>

        {/* eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex */}
        <div tabIndex={0} className="collapse collapse-plus">
          <input defaultChecked type="checkbox" />
          <h2 className={collapseableStyles}>Ingredients</h2>
          <ul className="lg:flex lg:flex-col lg:flex-wrap lg:h-96 gap-4 collapse-content">
            {recipe.ingredients.map((ingredient) => (
              <li className="flex gap-2 items-center" key={ingredient.id}>
                <div className="avatar">
                  <div className="w-[50px] rounded-full">
                    <RemixImage
                      height={50}
                      width={50}
                      transformOptions={{ fit: "cover", quality: 20 }}
                      src={
                        ingredient.imagePath
                          ? `${HF_AVATAR_IMAGE_URL}${ingredient.imagePath}`
                          : `${INGREDIENT_PLACEHOLDER_URL}?text=${ingredient.name}`
                      }
                      alt={ingredient.name}
                      responsive={[
                        {
                          size: {
                            width: 50,
                            height: 50,
                          },
                          maxWidth: 50,
                        },
                      ]}
                    />
                  </div>
                </div>
                {ingredient.name}
              </li>
            ))}
          </ul>
        </div>

        {/* eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex */}
        <div tabIndex={0} className="collapse collapse-plus mb-20">
          <input type="checkbox" />
          <h2 className={collapseableStyles}>Steps</h2>
          <ol className="ml-4 steps steps-vertical collapse-content items-center p-0">
            {recipe.steps.map((step) => (
              <li className="step" key={step.index}>
                {step.instructions}
              </li>
            ))}
          </ol>
        </div>
      </main>
    </div>
  );
};

export default RecipePage;

export const CatchBoundary: CatchBoundaryComponent = () => {
  const caught = useCatch();
  console.log(caught);
  return (
    <Container>
      <h1 className="text-xl">{caught.data}</h1>
    </Container>
  );
};
