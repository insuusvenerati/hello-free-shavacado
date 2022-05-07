import { useSession } from "@clerk/nextjs";
import { Container, List, LoadingOverlay, Text } from "@mantine/core";
import { useQuery } from "react-query";
import { NavbarContent } from "../components/NavContent";
import { RecipeLink } from "../components/RecipeLInk";
import { getRecipes } from "../util/getRecipes";

const RecipeList = () => {
  const { session } = useSession();
  const { data: recipes, isLoading } = useQuery(["recipes", session], () => getRecipes(session));

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

      <Container>
        {recipes?.length > 0 ? (
          <List>
            {recipes.map((recipe) => (
              <RecipeLink favoritedRecipe={recipe} key={recipe.id} />
            ))}
          </List>
        ) : (
          <Text>You don&apos;t have any recipes!</Text>
        )}
      </Container>
    </>
  );
};

export default RecipeList;
