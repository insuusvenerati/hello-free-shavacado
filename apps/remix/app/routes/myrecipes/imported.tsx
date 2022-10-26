import { Title, Grid } from "@mantine/core";
import { useTypedLoaderData } from "remix-typedjson";
import { ImportedRecipeCard } from "~/components/RecipeCard/ImportedRecipeCard";
import type { loader } from "../myrecipes";

const ImportedPage = () => {
  const data = useTypedLoaderData<typeof loader>();
  console.log(data);

  return (
    <>
      <Title mb="md" align="center" order={1}>
        Imported Recipes
      </Title>
      <Grid justify="center">
        {data?.importedRecipes?.map((recipe) => (
          <Grid.Col lg={3} md={12} key={recipe.id}>
            <ImportedRecipeCard recipe={recipe} />
          </Grid.Col>
        ))}
      </Grid>
    </>
  );
};

export default ImportedPage;
