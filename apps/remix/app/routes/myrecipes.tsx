import { getAuth } from "@clerk/remix/ssr.server";
import { Tabs } from "@mantine/core";
import { LoaderArgs, redirect } from "@remix-run/node";
import { Link, Outlet } from "@remix-run/react";
import { typedjson } from "remix-typedjson";
import { getAllCreatedRecipes } from "~/util/getAllCreatedRecipes.server";
import { getImportedRecipes } from "~/util/getImportedRecipes.server";
import { getRecipes } from "~/util/getRecipes.server";

export const loader = async ({ request }: LoaderArgs) => {
  const { userId } = await getAuth(request);

  if (!userId) {
    return redirect("/login");
  }

  const [createdRecipes, importedRecipes, favoriteRecipes] = await Promise.all([
    getAllCreatedRecipes(userId),
    getImportedRecipes(userId),
    getRecipes(userId),
  ]);

  return typedjson({
    createdRecipes,
    importedRecipes,
    favoriteRecipes,
  });
};

const RecipeList = () => {
  // display all the recipes
  return (
    <>
      {/* <SegmentedControl
        onChange={setSection}
        fullWidth
        data={sectionControlData}
        value={section}
        mb="md"
      /> */}

      <Tabs orientation="vertical" defaultValue="imported">
        <Tabs.List grow>
          <Tabs.Tab value="imported">
            <Link to="imported">Imported Recipes</Link>
          </Tabs.Tab>
          <Tabs.Tab value="created">Created Recipes</Tabs.Tab>
          <Tabs.Tab value="favorite">Favorite Recipes</Tabs.Tab>
        </Tabs.List>
      </Tabs>

      <Outlet />

      {/* {section === "imported-recipes" ? (
        <>
          <Title mb="md" align="center" order={1}>
            Imported Recipes
          </Title>
          <Grid justify="center">
            {importedRecipes.map((recipe) => (
              <Grid.Col lg={3} md={12} key={recipe.id}>
                <ImportedRecipeCard recipe={recipe} />
              </Grid.Col>
            ))}
          </Grid>
        </>
      ) : null}

      {section === "favorite-recipes" ? (
        <>
          <Title mb="md" mt="md" align="center" order={1}>
            Favorite Recipes
          </Title>
          <Grid justify="center">
            {favoriteRecipes.map((item) => {
              return (
                <Grid.Col key={item.id} lg={3} md={12}>
                  <RecipeCard recipe={item} />
                </Grid.Col>
              );
            })}
          </Grid>
        </>
      ) : null}

      {section === "created-recipes" ? (
        <>
          <Title mb="md" mt="md" align="center" order={1}>
            Created Recipes
          </Title>
          <Grid justify="center">
            {createdRecipes.map((item) => {
              return (
                <Grid.Col key={item.id} lg={3} md={12}>
                  <CreatedRecipeCard recipe={item} />
                </Grid.Col>
              );
            })}
          </Grid>
        </>
      ) : null} */}
    </>
  );
};

export default RecipeList;
