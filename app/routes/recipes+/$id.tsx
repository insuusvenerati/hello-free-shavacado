import type { User } from "@prisma/client";
import { Response } from "@remix-run/node";
import type { CatchBoundaryComponent } from "@remix-run/react";
import { useCatch } from "@remix-run/react";
import type { LoaderArgs, MetaFunction } from "@remix-run/server-runtime";
import { Clock, Flame, Star } from "lucide-react";
import { useMemo } from "react";
import { typedjson, useTypedLoaderData } from "remix-typedjson";
import invariant from "tiny-invariant";
import { AddToFavoritesButton } from "~/components/AddToFavoritesButton";
import { Container } from "~/components/common/Container";
import { ShareButton } from "~/components/common/ShareButton";
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

  try {
    const recipe = await getDbRecipeById(id);
    if (!recipe) {
      throw new Response("Recipe not found", { status: 404 });
    }
    return typedjson({ recipe, url });
  } catch (error) {
    console.log("Failed to retrieve recipe", error);
    throw new Response("Unable to retrieve recipe");
  }
};

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  return {
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
  };
};

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

  const nutrition = useMemo(() => JSON.parse(recipe.nutrition), [recipe.nutrition]);

  const difficulty = useMemo(
    () => new Array(recipe.difficulty).fill(<Flame className="mr-1 h-4 w-4" />),
    [recipe.difficulty],
  );

  return (
    <div className={pageLayout}>
      <div
        className="hero min-h-[450px]"
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
      <main className="container mx-auto mt-4 flex flex-col gap-8 p-4">
        <div className="flex flex-col justify-between gap-2 lg:flex-row">
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
            <div className="flex items-center gap-1">
              <h2 className="font-semibold">Total Time:</h2>
              <Clock className="mr-1 h-4 w-4" />
              {recipe.totalTime ?? 0} min
            </div>
            <div className="flex items-center">
              <h2 className="mr-1 font-semibold">Rating:</h2>
              {recipe.averageRating &&
                Array.from({ length: recipe.averageRating }).map((_, i) => (
                  <Star key={i} className="mr-1 h-4 w-4" />
                ))}
            </div>

            <div className="flex items-center">
              <h2 className="mr-2 font-semibold">Difficulty:</h2>
              {difficulty.map((d, i) => (
                <div key={i}>{d}</div>
              ))}
            </div>
          </div>
          <div className="flex flex-col">
            <h2 className="text-2xl font-bold">Nutrition</h2>
            {nutrition.map((n: any) => (
              <span key={n.name}>
                {n.name}: {n.amount ?? 0} {n.unit}
              </span>
            ))}
          </div>
          <div className="flex max-w-xs flex-col gap-4">
            <AddToFavoritesButton id={recipe.id} name={recipe.name} />
            <ShareButton
              text={recipe.description.slice(0, 64)}
              title={recipe.name}
              url={url.href}
              className="btn-sm btn"
            >
              Share Recipe
            </ShareButton>
          </div>
        </div>

        <div>
          <h2 className="mb-4 text-2xl font-bold">Tags</h2>
          <ul className="flex gap-2">
            {recipe.tags.map((tag) => (
              <li className="badge-accent badge" key={tag.id}>
                {tag.name}
              </li>
            ))}
          </ul>
        </div>

        {/* eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex */}
        <div tabIndex={0} className="collapse-plus collapse">
          <input defaultChecked type="checkbox" />
          <h2 className={collapseableStyles}>Ingredients</h2>
          <ul className="collapse-content gap-4 lg:flex lg:h-96 lg:flex-col lg:flex-wrap">
            {recipe.ingredients.map((ingredient) => (
              <li className="flex items-center gap-2" key={ingredient.id}>
                <div className="avatar">
                  <div className="w-[50px] rounded-full">
                    <img
                      height={50}
                      width={50}
                      src={
                        ingredient.imagePath
                          ? `${HF_AVATAR_IMAGE_URL}${ingredient.imagePath}`
                          : `${INGREDIENT_PLACEHOLDER_URL}?text=${ingredient.name}`
                      }
                      alt={ingredient.name}
                    />
                  </div>
                </div>
                {ingredient.name}
              </li>
            ))}
          </ul>
        </div>

        {/* eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex */}
        <div tabIndex={0} className="collapse-plus collapse mb-20">
          <input type="checkbox" />
          <h2 className={collapseableStyles}>Steps</h2>
          <ol className="collapse-content steps steps-vertical ml-4 items-center p-0">
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
