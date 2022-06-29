import { Container, Grid, LoadingOverlay, Title } from "@mantine/core";
import { NextSeo } from "next-seo";
import { useCallback, useState } from "react";
import { useQueries } from "react-query";
import { RecipeCard } from "../components/RecipeCard.server";
import { useFavoriteRecipesQuery } from "../hooks/useFavoriteRecipesQuery";
import { useRecipes } from "../hooks/useRecipes";
import { hellofreshSearchBySlug } from "../util/hellofresh";

const RecipeList = () => {
  // const [recipes, setRecipes] = useState<RecipeQuery[]>();
  const [modalVisible, setModalVisible] = useState(false);
  const { setSelectedRecipe } = useRecipes();
  const { data: favoriteRecipes, isSuccess } = useFavoriteRecipesQuery();

  const recipeQueries = useQueries(
    favoriteRecipes?.map((recipe) => {
      return {
        queryKey: ["recipe", recipe.slug],
        queryFn: () => hellofreshSearchBySlug({ slug: recipe.slug }),
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
        {recipes &&
          recipes?.map((items) => {
            const recipe = items?.items[0];
            return (
              <Grid.Col key={recipe?.id} lg={3} md={12}>
                <RecipeCard
                  handler={modalHandler}
                  recipe={recipe}
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
