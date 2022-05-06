import { useSession } from "@clerk/nextjs";
import { Container, List, LoadingOverlay, Text } from "@mantine/core";
import { NextLink } from "@mantine/next";
import { useQuery } from "react-query";
import { NavbarContent } from "../components/NavContent";
import { getRecipes } from "../util/getRecipes";

const RecipeList = () => {
  const { session } = useSession();
  const { data: recipes, isLoading } = useQuery(["recipes", session], () => getRecipes(session));

  console.log(recipes);

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
              <>
                <NextLink href="/myrecipes" key={recipe.id}>
                  <List.Item>{recipe.recipe}</List.Item>
                </NextLink>
              </>
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
