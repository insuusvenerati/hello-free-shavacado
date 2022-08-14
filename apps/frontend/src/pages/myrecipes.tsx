import { Container, Grid, LoadingOverlay, Title } from "@mantine/core";
import { NextSeo } from "next-seo";
import { useCallback, useState } from "react";
import { useQueries } from "react-query";
import { getRecipeById } from "util/getRecipeById";
import { ImportedRecipeLink } from "../components/ImportedRecipeLink";
import { RecipeCard } from "../components/RecipeCard";
import { useRecipesContext } from "../context/RecipesContext";
import { useFavoriteRecipesQuery } from "../hooks/useFavoriteRecipesQuery";
import { useGetImportedRecipesQuery } from "../hooks/useGetImportedRecipesQuery";

const RecipeList = () => {
  // const [recipes, setRecipes] = useState<RecipeQuery[]>();
  const [modalVisible, setModalVisible] = useState(false);
  const { setSelectedRecipe } = useRecipesContext();
  const { data: favoriteRecipes, isSuccess } = useFavoriteRecipesQuery();
  const { data: importedRecipes } = useGetImportedRecipesQuery();

  const recipeQueries = useQueries(
    favoriteRecipes?.map((recipe) => {
      return {
        queryKey: ["recipe", recipe.uuid],
        queryFn: () => getRecipeById({ id: recipe.uuid }),
        enabled: !(typeof favoriteRecipes === "undefined"),
      };
    }),
  );

  const recipes = recipeQueries.map((query) => query.data);

  const modalHandler = useCallback(() => {
    setModalVisible(!modalVisible);
  }, [modalVisible]);

  if (!isSuccess) {
    return (
      <Container>
        <LoadingOverlay visible />
      </Container>
    );
  }

  // display all the recipes
  return (
    <>
      <NextSeo title="Favorites" />
      <Title mb="md" align="center" order={1}>
        Favorite Recipes
      </Title>

      <Grid justify="center">
        {importedRecipes &&
          importedRecipes.map((recipe) => (
            <Grid.Col key={recipe.id}>
              <ImportedRecipeLink recipe={recipe} />
            </Grid.Col>
          ))}
      </Grid>

      <Grid justify="center">
        {recipes &&
          recipes?.map((item) => {
            if (!item) return;
            console.log(item);
            return (
              <Grid.Col key={item.id} lg={3} md={12}>
                <RecipeCard
                  handler={modalHandler}
                  recipe={item}
                  setSelectedRecipe={setSelectedRecipe}
                />
              </Grid.Col>
            );
          })}
      </Grid>
    </>
  );
};

export default RecipeList;
