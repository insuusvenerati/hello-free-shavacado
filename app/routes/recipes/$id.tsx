import type { User } from "@prisma/client";
import { Response } from "@remix-run/node";
import { useCatch } from "@remix-run/react";
import type { LoaderArgs } from "@remix-run/server-runtime";
import type { CatchBoundaryComponent } from "@remix-run/server-runtime/dist/routeModules";
import type { TypedMetaFunction } from "remix-typedjson";
import { typedjson, useTypedLoaderData } from "remix-typedjson";
import invariant from "tiny-invariant";
import { Container } from "~/components/common/Container";
import { RemixImage } from "~/components/RemixImage";
import {
  HF_AVATAR_IMAGE_URL,
  HF_CARD_IMAGE_URL,
  HF_COVER_IMAGE_URL,
  INGREDIENT_PLACEHOLDER_URL,
} from "~/constants";
import { getRecipeByName } from "~/models/recipe.server";
import { getTokenFromDatabase } from "~/models/token.server";
import { cn, useMatchesData } from "~/utils";

export const loader = async ({ request, params }: LoaderArgs) => {
  const id = params.id;
  invariant(id, "id is required");
  const token = await getTokenFromDatabase();

  if (typeof token !== "string") {
    throw new Response("Unable to get recipe from API. Try again later", { status: 401 });
  }

  try {
    const recipe = await getRecipeByName({ name: id, token: token });
    if (!recipe) {
      throw new Response("Recipe not found", { status: 404 });
    }
    return typedjson(recipe.items[0], {
      headers: {
        "Cache-Control": "public, max-age=60, s-maxage=3600",
      },
    });
  } catch (error) {
    console.log("Failed to retrieve recipe", error);
    throw new Response("Unable to retrieve recipe");
  }
};

export const meta: TypedMetaFunction<typeof loader> = ({ data }) => {
  return {
    title: data.name,
    description: data.description,
    "og:description": data.description,
    "og:image": `${HF_CARD_IMAGE_URL}${data.imagePath}`,
    "og:url": "https://hello-free-shavacado-new.fly.dev/",
    "og:type": "website",
    "og:title": "Hello Free Shavacado",
    "twitter:card": "summary_large_image",
    "twitter:title": data.name,
    "twitter:description": data.description,
    "twitter:image": `${HF_CARD_IMAGE_URL}${data.imagePath}`,
  };
};

const RecipePage = () => {
  const data = useTypedLoaderData<typeof loader>();
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

  return (
    <div className={pageLayout}>
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
      <main className="container mx-auto mt-4 gap-8 flex flex-col p-4">
        <div className="flex flex-col">
          <h2 className="text-2xl font-bold">Allergens</h2>
          <ul>
            {data.allergens.map((allergen) => (
              <li key={allergen.id}>{allergen.name}</li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-4">Tags</h2>
          <ul className="flex gap-2">
            {data.tags.map((tag) => (
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
            {data.ingredients.map((ingredient) => (
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
            {data.steps.map((step) => (
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
