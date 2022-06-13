import { useUser } from "@clerk/nextjs";
import { XIcon } from "@heroicons/react/outline";
import { ActionIcon, Center, Grid, Loader, Pagination, TextInput, ThemeIcon } from "@mantine/core";
import { getCookie, setCookies } from "cookies-next";
import LogRocket from "logrocket";
import { GetStaticProps } from "next";
import { useCallback, useEffect, useState } from "react";
import { Layout } from "../components/Layout";
import { FilteredOrPopularRecipesList } from "../components/PopularFilteredRecipesList";
import RecipeModal from "../components/RecipeModal";
import { useRecipes } from "../hooks/useRecipes";
import { Item } from "../types/recipes";
import { HELLOFRESH_SEARCH_URL } from "../util/constants";
import { hellofreshGetToken } from "../util/hellofresh";

export const getStaticProps: GetStaticProps = async () => {
  const response = await fetch(`${HELLOFRESH_SEARCH_URL}/favorites`);
  const data: Item[] = await response.json();

  return { props: { data } };
};

const Home = ({ data: popularRecipes }: { data: Item[] }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const token = getCookie("token") as string;
  const { user } = useUser();

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
    clearSearchHandler,
    searchText,
  } = useRecipes();

  // const { data: popularRecipes, isLoading: popularRecipesLoading } = usePopularRecipesQuery();

  const modalHandler = useCallback(() => {
    setModalVisible(!modalVisible);
  }, [modalVisible]);

  useEffect(() => {
    if (user) {
      LogRocket.identify(user.id, {
        name: user.fullName,
        email: user.primaryEmailAddress.emailAddress,
      });
    }
  }, [user]);

  // Get token
  useEffect(() => {
    if (!token) {
      hellofreshGetToken()
        .then((token) => setCookies("token", token.access_token))
        .catch((e) => console.error(e));
    }
  }, [token]);

  const FilteredOrPopularRecipesListProps = {
    filteredRecipes,
    modalHandler,
    popularRecipes,
    setSelectedRecipe,
    isLoading,
  };

  return (
    <>
      <Layout>
        <RecipeModal onClose={modalHandler} opened={modalVisible} recipe={selectedRecipe} />

        <Grid justify="center">
          <Grid.Col lg={6} md={12}>
            <TextInput
              value={searchText}
              error={isError && error.message}
              label="Search"
              onChange={onChangeHandler}
              placeholder="Search"
              rightSection={
                isLoading ? (
                  <Loader size="sm" />
                ) : filteredRecipes ? (
                  <ActionIcon onClick={clearSearchHandler} mr="xs">
                    <ThemeIcon variant="outline">
                      <XIcon width={16} />
                    </ThemeIcon>
                  </ActionIcon>
                ) : undefined
              }
              size="md"
              type="text"
            />
          </Grid.Col>
        </Grid>
        <Center mb={5} mt={5}>
          <Grid columns={1} justify="center">
            <Grid.Col span={1}>
              <Pagination onChange={pageChangeHandler} page={page} total={recipesTotal} />
            </Grid.Col>
          </Grid>
        </Center>
        <FilteredOrPopularRecipesList {...FilteredOrPopularRecipesListProps} />
      </Layout>
    </>
  );
};

export default Home;
