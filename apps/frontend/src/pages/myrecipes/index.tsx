import { buildClerkProps, getAuth } from "@clerk/nextjs/server";
import {
  Grid,
  Loader,
  SegmentedControl,
  SegmentedControlItem,
  Skeleton,
  Title,
} from "@mantine/core";
import { CreatedRecipeCard } from "components/RecipeCard/CreatedRecipe";
import { ImportedRecipeCard } from "components/RecipeCard/ImportedRecipeCard";
import { useGetAllCreatedRecipes } from "hooks/useGetAllCreatedRecipes";
import { GetServerSideProps } from "next";
import { NextSeo } from "next-seo";
import { useMemo, useState } from "react";
import { dehydrate, QueryClient, useQueries } from "react-query";
import { getAllCreatedRecipes } from "util/getAllCreatedRecipes";
import { getImportedRecipes } from "util/getImportedRecipes";
import { getRecipeById } from "util/getRecipeById";
import { getRecipes } from "util/getRecipes";
import { RecipeCard } from "../../components/RecipeCard/RecipeCard";
import { useFavoriteRecipesQuery } from "../../hooks/useFavoriteRecipesQuery";
import { useGetImportedRecipesQuery } from "../../hooks/useGetImportedRecipesQuery";

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const { userId, getToken } = getAuth(req);

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(["favoriteRecipes", userId], () => getRecipes(userId));
  await queryClient.prefetchQuery(["importedRecipes", userId], () => getImportedRecipes(userId));
  await queryClient.prefetchQuery(["created-recipe", userId], async () =>
    getAllCreatedRecipes({ userId, token: await getToken() }),
  );

  return {
    props: { ...buildClerkProps(req), dehydratedState: dehydrate(queryClient) },
  };
};

const RecipeList = () => {
  const { data: favoriteRecipes } = useFavoriteRecipesQuery();
  const { data: importedRecipes, isSuccess: importedRecipesSuccess } = useGetImportedRecipesQuery();
  const { data: createdRecipes } = useGetAllCreatedRecipes();
  const [section, setSection] = useState<string>("imported-recipes");

  const recipeQueries = useQueries(
    favoriteRecipes?.map((recipe) => {
      return {
        queryKey: ["recipe", recipe.uuid],
        queryFn: () => getRecipeById({ id: recipe.uuid }),
        enabled: !(typeof favoriteRecipes === "undefined"),
      };
    }) ?? [], // https://stackoverflow.com/a/68169883/5562803
  );

  const recipes = recipeQueries.map((query) => query.data);

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

  if (!importedRecipesSuccess) {
    return (
      <Grid justify="center">
        <Loader />
      </Grid>
    );
  }

  // display all the recipes
  return (
    <>
      <NextSeo title="Favorites" />

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
            {recipes?.map((item) => {
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
