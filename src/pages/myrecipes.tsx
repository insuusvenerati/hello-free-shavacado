import { useSession } from "@clerk/nextjs";
import { Container, List, LoadingOverlay, Text } from "@mantine/core";
import { useQuery } from "react-query";
import { NavbarContent } from "../components/NavContent";
import { getRecipes } from "../util/getRecipes";

const RecipeList = () => {
  const { session } = useSession();

  const { data: recipes, isLoading } = useQuery(["recipes", session], () =>
    getRecipes(session),
  );

  console.info(recipes);

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
            {recipes.map((todo) => (
              <List.Item key={todo.id}>{todo.recipe}</List.Item>
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
