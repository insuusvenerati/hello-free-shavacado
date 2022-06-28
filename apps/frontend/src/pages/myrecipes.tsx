import { Container, Grid, LoadingOverlay, Title } from "@mantine/core";
import { useCallback, useState } from "react";
import { useQueries } from "react-query";
import { Layout } from "../components/Layout";
import { RecipeCard } from "../components/RecipeCard";
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
    <Layout>
      <Title mb="md" align="center" order={1}>
        Favorite Recipes
      </Title>

      <Container size="xl">
        <Grid columns={4} justify="center">
          {recipes &&
            recipes?.map((items) => {
              const recipe = items?.items[0];
              return (
                <Grid.Col key={recipe?.id} md={1} sm={2}>
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
    </Layout>
  );
};

export default RecipeList;
