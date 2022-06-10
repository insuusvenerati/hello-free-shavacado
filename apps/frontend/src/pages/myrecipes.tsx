import { Container, Grid, LoadingOverlay, Title } from "@mantine/core";
import { useCallback, useEffect, useState } from "react";
import { NavbarContent } from "../components/NavContent";
import { RecipeCard } from "../components/RecipeCard";
import { useFavoriteRecipesQuery } from "../hooks/useFavoriteRecipesQuery";
import { useRecipes } from "../hooks/useRecipes";
import { RecipeQuery } from "../types/recipes";
import { hellofreshSearchBySlug } from "../util/hellofresh";

const RecipeList = () => {
  const [recipes, setRecipes] = useState<RecipeQuery[]>();
  const [modalVisible, setModalVisible] = useState(false);
  const { setSelectedRecipe } = useRecipes();
  const { data: favoriteRecipes, isLoading } = useFavoriteRecipesQuery();

  useEffect(() => {
    const getRecipesFromFavorites = async () =>
      Promise.all(
        favoriteRecipes?.map(async (recipe) => {
          return await hellofreshSearchBySlug({ slug: recipe.recipe });
        }),
      )
        .then((data) => setRecipes(data))
        .catch((err) => console.log(err));
    getRecipesFromFavorites();
  }, [favoriteRecipes]);

  const modalHandler = useCallback(() => {
    setModalVisible(!modalVisible);
  }, [modalVisible]);

  if (isLoading) {
    return (
      <Container>
        <LoadingOverlay visible />
      </Container>
    );
  }

  // display all the recipes
  return (
    <>
      <NavbarContent />

      <Title mb="md" align="center" order={1}>
        Favorite Recipes
      </Title>

      <Container size="xl">
        <Grid columns={4} justify="center">
          {recipes &&
            recipes?.map((items) => {
              const recipe = items.items[0];
              return (
                <Grid.Col key={recipe.id} md={1} sm={2}>
                  <RecipeCard
                    handler={modalHandler}
                    recipe={recipe}
                    setSelectedRecipe={setSelectedRecipe}
                  />
                </Grid.Col>
              );
            })}
        </Grid>
      </Container>
    </>
  );
};

export default RecipeList;
