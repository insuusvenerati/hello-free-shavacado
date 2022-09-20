import { Grid, LoadingOverlay, SegmentedControl, SegmentedControlItem, Title } from "@mantine/core";
import { NextSeo } from "next-seo";
import { useMemo, useState } from "react";
import { useQueries } from "react-query";
import { getRecipeById } from "util/getRecipeById";
import { RecipeCard } from "../components/RecipeCard";
import { useFavoriteRecipesQuery } from "../hooks/useFavoriteRecipesQuery";
import { useGetImportedRecipesQuery } from "../hooks/useGetImportedRecipesQuery";

const RecipeList = () => {
  // const [recipes, setRecipes] = useState<RecipeQuery[]>();
  const { data: favoriteRecipes, isSuccess } = useFavoriteRecipesQuery();
  const { data: importedRecipes, isSuccess: importedRecipesSuccess } = useGetImportedRecipesQuery();
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
    ],
    [],
  );

  if (!isSuccess || !importedRecipesSuccess) {
    return (
      <Grid justify="center">
        <LoadingOverlay visible />
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
                <RecipeCard recipe={recipe} />
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
                  <RecipeCard recipe={item} />
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
