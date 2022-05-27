import { Center, Grid, Loader, LoadingOverlay, Pagination, TextInput } from "@mantine/core";
import { getCookie, setCookies } from "cookies-next";
import { GetStaticProps } from "next";
import { useCallback, useEffect, useState } from "react";
import { MyAppShell } from "../components/MyAppShell";
import { FilteredOrPopularRecipesList } from "../components/PopularFilteredRecipesList";
import RecipeModal from "../components/RecipeModal";
import { useRecipes } from "../hooks/useRecipes";
import { HELLOFRESH_SEARCH_URL } from "../util/constants";
import { hellofreshGetToken } from "../util/hellofresh";

export const getStaticProps: GetStaticProps = async () => {
  const response = await fetch(`${HELLOFRESH_SEARCH_URL}/favorites`);
  const data = await response.json();

  return { props: { data } };
};

const Home = ({ data: popularRecipes }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const token = getCookie("token") as string;

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
    uniqueAllergens,
    ingredients,
    selectedAllergens,
    selectedIngredients,
  } = useRecipes();

  // const { data: popularRecipes, isLoading: popularRecipesLoading } = usePopularRecipesQuery();

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
    uniqueAllergens,
    handleSetSelectedAllergens,
    selectedAllergens,
    ingredients,
    handleSetSelectedIngredients,
    selectedIngredients,
  };

  const FilteredOrPopularRecipesListProps = {
    filteredRecipes,
    modalHandler,
    popularRecipes,
    setSelectedRecipe,
    isLoading,
  };

  return (
    <>
      <MyAppShell {...appShellProps}>
        <RecipeModal onClose={modalHandler} opened={modalVisible} recipe={selectedRecipe} />

        <Grid justify="center">
          <Grid.Col lg={6} md={12}>
            <TextInput
              error={isError && error.message}
              label="Search"
              onChange={onChangeHandler}
              placeholder="Search"
              rightSection={isLoading ? <Loader size="sm" /> : undefined}
              size="md"
              type="search"
            />
          </Grid.Col>
        </Grid>
        <Center mb={5} mt={5}>
          <Grid columns={1} justify="center">
            <Grid.Col span={1}>
              {recipesTotal > 0 && <Pagination onChange={pageChangeHandler} page={page} total={recipesTotal} />}
            </Grid.Col>
          </Grid>
        </Center>
        {filteredRecipes || popularRecipes || !isLoading ? (
          <FilteredOrPopularRecipesList {...FilteredOrPopularRecipesListProps} />
        ) : (
          <LoadingOverlay visible />
        )}
      </MyAppShell>
    </>
  );
};

export default Home;
