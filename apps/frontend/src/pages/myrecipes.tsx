import { useSession } from "@clerk/nextjs";
import { Container, Grid, LoadingOverlay, Title } from "@mantine/core";
import { useCallback, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { NavbarContent } from "../components/NavContent";
import { RecipeCard } from "../components/RecipeCard";
import { useRecipes } from "../hooks/useRecipes";
import { RecipeQuery } from "../types/recipes";
import { getRecipes } from "../util/getRecipes";
import { hellofreshSearchBySlug } from "../util/hellofresh";

const RecipeList = () => {
  const { session } = useSession();
  const [recipes, setRecipes] = useState<RecipeQuery[]>();
  const [modalVisible, setModalVisible] = useState(false);
  const { setSelectedRecipe } = useRecipes();
  const { data: favoriteRecipes, isLoading } = useQuery(
    ["recipes", session],
    () => getRecipes(session),
    { enabled: !!session },
  );

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
