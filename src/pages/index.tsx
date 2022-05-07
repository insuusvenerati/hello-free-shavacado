import { Center, Grid, Loader, Pagination, TextInput } from "@mantine/core";
import { getCookie, setCookies } from "cookies-next";
import { useCallback, useEffect, useState } from "react";
import { MyAppShell } from "../components/MyAppShell";
import { RecipeCard } from "../components/RecipeCard";
import RecipeModal from "../components/RecipeModal";
import { useRecipes } from "../hooks/useRecipes";
import { hellofreshGetToken } from "../util/hellofresh";

const Home = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const token = getCookie("token");

  const {
    isLoading,
    isError,
    error,
    filteredRecipes,
    selectedRecipe,
    recipesTotal,
    page,
    setSelectedRecipe,
    onChangeHandler,
    pageChangeHandler,
    handleSetSelectedIngredients,
    handleSetSelectedAllergens,
    allergens,
    ingredients,
    selectedAllergens,
    selectedIngredients,
  } = useRecipes();

  const modalHandler = useCallback(() => {
    setModalVisible(!modalVisible);
  }, [modalVisible]);

  // Get token
  useEffect(() => {
    if (!token) {
      hellofreshGetToken()
        .then((token) => setCookies("token", token.access_token))
        .catch((e) => console.error(e));
    }
  }, [token]);

  const appShellProps = {
    allergens,
    handleSetSelectedAllergens,
    selectedAllergens,
    ingredients,
    handleSetSelectedIngredients,
    selectedIngredients,
  };

  return (
    <>
      <MyAppShell {...appShellProps}>
        <RecipeModal
          onClose={modalHandler}
          opened={modalVisible}
          recipe={selectedRecipe}
        />

        <Grid justify="center">
          <Grid.Col lg={6} md={12}>
            <TextInput
              error={isError && error.message}
              label="Search"
              onChange={onChangeHandler}
              placeholder="Search"
              rightSection={isLoading ? <Loader size="sm" /> : undefined}
              size="md"
            />
          </Grid.Col>
        </Grid>
        <Center mb={5} mt={5}>
          <Grid columns={1} justify="center">
            <Grid.Col span={1}>
              {recipesTotal > 0 && (
                <Pagination
                  onChange={pageChangeHandler}
                  page={page}
                  total={recipesTotal}
                />
              )}
            </Grid.Col>
          </Grid>
        </Center>
        <Grid columns={4} justify="center">
          {filteredRecipes?.map((recipe) => {
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
      </MyAppShell>
    </>
  );
};

export default Home;
