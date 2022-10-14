import { getAuth } from "@clerk/remix/ssr.server";
import type { SegmentedControlItem } from "@mantine/core";
import { Skeleton } from "@mantine/core";
import { Grid, SegmentedControl, Title } from "@mantine/core";
import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useMemo, useState } from "react";
import { CreatedRecipeCard } from "~/components/RecipeCard/CreatedRecipe";
import { ImportedRecipeCard } from "~/components/RecipeCard/ImportedRecipeCard";
import { RecipeCard } from "~/components/RecipeCard/RecipeCard";
import { getAllCreatedRecipes } from "~/util/getAllCreatedRecipes";
import { getImportedRecipes } from "~/util/getImportedRecipes";
import { getRecipes } from "~/util/getRecipes";

type LoaderData = {
  createdRecipes: Awaited<ReturnType<typeof getAllCreatedRecipes>>;
  importedRecipes: Awaited<ReturnType<typeof getImportedRecipes>>;
  favoriteRecipes: Awaited<ReturnType<typeof getRecipes>>;
};

export const loader: LoaderFunction = async ({ context, params, request }) => {
  const { userId } = await getAuth(request);

  const createdRecipes = await getAllCreatedRecipes(userId);
  const importedRecipes = await getImportedRecipes(userId);
  const favoriteRecipes = await getRecipes(userId);

  return json<LoaderData>({
    createdRecipes,
    importedRecipes,
    favoriteRecipes,
  });
};

const RecipeList = () => {
  const { createdRecipes, importedRecipes, favoriteRecipes } = useLoaderData<LoaderData>();
  const [section, setSection] = useState<string>("imported-recipes");

  const sectionControlData: SegmentedControlItem[] = useMemo(
    () => [
      {
        label: "Imported Recipes",
        value: "imported-recipes",
      },
      {
        label: "Favorite Recipes",
        value: "favorite-recipes",
      },
      {
        label: "Created Recipes",
        value: "created-recipes",
      },
    ],
    [],
  );

  // display all the recipes
  return (
    <>
      <SegmentedControl
        onChange={setSection}
        fullWidth
        data={sectionControlData}
        value={section}
        mb="md"
      />

      {section === "imported-recipes" ? (
        <>
          <Title mb="md" align="center" order={1}>
            Imported Recipes
          </Title>
          <Grid justify="center">
            {importedRecipes.map((recipe) => (
              <Grid.Col lg={3} md={12} key={recipe.id}>
                <ImportedRecipeCard recipe={recipe} />
              </Grid.Col>
            ))}
          </Grid>
        </>
      ) : null}

      {section === "favorite-recipes" ? (
        <>
          <Title mb="md" mt="md" align="center" order={1}>
            Favorite Recipes
          </Title>
          <Grid justify="center">
            {favoriteRecipes?.map((item) => {
              if (!item) return;
              return (
                <Grid.Col key={item.id} lg={3} md={12}>
                  <Skeleton visible={!item}>
                    <RecipeCard recipe={item} />
                  </Skeleton>
                </Grid.Col>
              );
            })}
          </Grid>
        </>
      ) : null}

      {section === "created-recipes" ? (
        <>
          <Title mb="md" mt="md" align="center" order={1}>
            Created Recipes
          </Title>
          <Grid justify="center">
            {createdRecipes?.map((item) => {
              if (!item) return;
              return (
                <Grid.Col key={item.id} lg={3} md={12}>
                  <CreatedRecipeCard recipe={item} />
                </Grid.Col>
              );
            })}
          </Grid>
        </>
      ) : null}
    </>
  );
};

export default RecipeList;
