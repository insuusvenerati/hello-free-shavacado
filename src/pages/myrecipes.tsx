import { useSession } from "@clerk/nextjs";
import { withServerSideAuth } from "@clerk/nextjs/ssr";
import { Container, List, LoadingOverlay, Text } from "@mantine/core";
import { GetServerSideProps } from "next";
import { QueryClient, useQuery } from "react-query";
import { NavbarContent } from "../components/NavContent";
import { RecipeLink } from "../components/RecipeLink";
import { FavoritedRecipe, getRecipes } from "../util/getRecipes";
import { supabaseClient } from "../util/supabase";

export const getServerSideProps: GetServerSideProps = withServerSideAuth(async ({ req }) => {
  const session = req.auth;
  const queryClient = new QueryClient();

  async function fetchRecipes() {
    const supabaseAccessToken = await session.getToken({ template: "supabase" });
    const supabase = await supabaseClient(supabaseAccessToken);
    const { data } = await supabase.from<FavoritedRecipe>("recipes").select("*");
    return data;
  }
  const data = await fetchRecipes();
  await queryClient.prefetchQuery(["recipes", session], fetchRecipes);

  if (!session.sessionId) {
    return;
  }

  return { props: { data } };
});

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
