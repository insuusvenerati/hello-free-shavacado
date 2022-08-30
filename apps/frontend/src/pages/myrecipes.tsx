import { Container, Grid, LoadingOverlay, Title } from "@mantine/core";
import { NextSeo } from "next-seo";
import { useQueries } from "react-query";
import { getRecipeById } from "util/getRecipeById";
import { RecipeCard } from "../components/RecipeCard";
import { useFavoriteRecipesQuery } from "../hooks/useFavoriteRecipesQuery";
import { useGetImportedRecipesQuery } from "../hooks/useGetImportedRecipesQuery";

const RecipeList = () => {
  // const [recipes, setRecipes] = useState<RecipeQuery[]>();
  const { data: favoriteRecipes, isSuccess } = useFavoriteRecipesQuery();
  const { data: importedRecipes } = useGetImportedRecipesQuery();

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
        Imported Recipes
      </Title>
      <Grid justify="center">
        {importedRecipes &&
          importedRecipes.map((recipe) => (
            <Grid.Col lg={3} md={12} key={recipe.id}>
              <RecipeCard recipe={recipe} />
            </Grid.Col>
          ))}
      </Grid>

      <Title mb="md" align="center" order={1}>
        Favorite Recipes
      </Title>
      <Grid justify="center">
        {recipes &&
          recipes?.map((item) => {
            if (!item) return;
            return (
              <Grid.Col key={item.id} lg={3} md={12}>
                <RecipeCard recipe={item} />
              </Grid.Col>
            );
          })}
      </Grid>
    </>
  );
};

export default RecipeList;
