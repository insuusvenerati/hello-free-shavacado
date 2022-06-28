import { withServerSideAuth } from "@clerk/nextjs/ssr";
import { XIcon } from "@heroicons/react/outline";
import {
  ActionIcon,
  Avatar,
  Center,
  Grid,
  Group,
  Loader,
  MantineColor,
  Pagination,
  SelectItemProps,
  Text,
  TextInput,
  ThemeIcon,
} from "@mantine/core";
import { getCookie, setCookies } from "cookies-next";
import { GetServerSideProps } from "next";
import { forwardRef, useCallback, useEffect, useState } from "react";
import { dehydrate, QueryClient } from "react-query";
import { Layout } from "../components/Layout";
import { FilteredOrPopularRecipesList } from "../components/PopularFilteredRecipesList";
import RecipeModal from "../components/RecipeModal";
import { usePopularRecipesQuery } from "../hooks/usePopularRecipesQuery";
import { useRecipes } from "../hooks/useRecipes";
import { getPopularRecipes } from "../util/getPopularRecipes";
import { getRecipes } from "../util/getRecipes";
import { hellofreshGetToken } from "../util/hellofresh";

export const getServerSideProps: GetServerSideProps = withServerSideAuth(
  async ({ req }) => {
    const queryClient = new QueryClient();
    await queryClient.prefetchQuery(["popularRecipes"], getPopularRecipes);
    await queryClient.prefetchQuery(["favoriteRecipes", req?.auth?.userId], () =>
      getRecipes(req?.auth?.userId),
    );

    return {
      props: {
        dehydratedState: dehydrate(queryClient),
      },
    };
  },
  { loadUser: true, loadSession: true },
);

interface ItemProps extends SelectItemProps {
  color: MantineColor;
  description: string;
  image: string;
}

const AutoCompleteItem = forwardRef<HTMLDivElement, ItemProps>(
  ({ description, value, image, ...others }: ItemProps, ref) => {
    return (
      <div ref={ref} {...others}>
        <Group noWrap>
          <Avatar src={image} />

          <div>
            <Text>{value}</Text>
            <Text size="xs" color="dimmed">
              {description}
            </Text>
          </div>
        </Group>
      </div>
    );
  },
);

const Home = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const token = getCookie("token") as string;
  const { data: popularRecipes } = usePopularRecipesQuery();

  const {
    isLoading,
    isError,
    error,
    filteredRecipes,
    selectedRecipe,
    recipesTotal,
    setSelectedRecipe,
    onChangeHandler,
    pageChangeHandler,
    clearSearchHandler,
    searchText,
    onSubmitHandler,
    isFetching,
    page,
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

  const filteredOrPopularRecipesListProps = {
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
            <form onSubmit={onSubmitHandler}>
              <TextInput
                value={searchText}
                error={isError && error?.message}
                label="Search"
                onChange={onChangeHandler}
                placeholder="Search"
                rightSection={
                  isLoading || isFetching ? (
                    <Loader size="sm" />
                  ) : filteredRecipes ? (
                    <ActionIcon onClick={clearSearchHandler} mr="xs">
                      <ThemeIcon variant="outline">
                        <XIcon width={16} />
                      </ThemeIcon>
                    </ActionIcon>
                  ) : undefined
                }
                disabled={isLoading}
                size="md"
                type="search"
              />
            </form>
          </Grid.Col>
        </Grid>
        <Center mb={5} mt={5}>
          <Grid columns={1} justify="center">
            <Grid.Col span={1}>
              {recipesTotal && recipesTotal > 0 && (
                <Pagination onChange={pageChangeHandler} page={page} total={recipesTotal} />
              )}
            </Grid.Col>
          </Grid>
        </Center>
        <FilteredOrPopularRecipesList {...filteredOrPopularRecipesListProps} />
      </Layout>
    </>
  );
};

AutoCompleteItem.displayName = "AutoCompleteItem";

export default Home;
