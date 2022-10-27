import { Grid, Title } from "@mantine/core";
import type { ImportedRecipe } from "@prisma/client";
import { useMatches } from "@remix-run/react";
import { ImportedRecipeCard } from "~/components/RecipeCard/ImportedRecipeCard";

const ImportedPage = () => {
  const matches = useMatches().find((match) => match.pathname === "/myrecipes")?.data as {
    importedRecipes: ImportedRecipe[];
  };

  return (
    <>
      <Title mb="md" align="center" order={1}>
        Imported Recipes
      </Title>
      <Grid justify="center">
        {matches?.importedRecipes?.map((recipe) => (
          <Grid.Col lg={3} md={12} key={recipe.id}>
            <ImportedRecipeCard recipe={recipe} />
          </Grid.Col>
        ))}
      </Grid>
    </>
  );
};

export default ImportedPage;
