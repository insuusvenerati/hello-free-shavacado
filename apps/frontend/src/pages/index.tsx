import {
  Avatar,
  Center,
  Grid,
  Group,
  MantineColor,
  Pagination,
  SelectItemProps,
  Text,
} from "@mantine/core";
import { getCookie, setCookies } from "cookies-next";
import { GetServerSideProps } from "next";
import { forwardRef, useCallback, useEffect, useState } from "react";
import { dehydrate, QueryClient } from "react-query";
import { FilteredOrPopularRecipesListMemo } from "../components/PopularFilteredRecipesList";
import { LazyRecipeModal } from "../components/RecipeModal";
import { useRecipesContext } from "../context/RecipesContext";
import { usePopularRecipesQuery } from "../hooks/usePopularRecipesQuery";
import { getPopularRecipes } from "../util/getPopularRecipes";
import { hellofreshGetToken } from "../util/hellofresh";

export const getServerSideProps: GetServerSideProps = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(["popularRecipes"], getPopularRecipes);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

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
    filteredRecipes,
    selectedRecipe,
    recipesTotal,
    setSelectedRecipe,
    pageChangeHandler,
    page,
  } = useRecipesContext();

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
      <LazyRecipeModal onClose={modalHandler} opened={modalVisible} recipe={selectedRecipe} />

      {/* <Grid justify="center">
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
      </Grid> */}
      <Center mb={5} mt={5}>
        <Grid columns={1} justify="center">
          <Grid.Col span={1}>
            {recipesTotal && recipesTotal > 0 && (
              <Pagination onChange={pageChangeHandler} page={page} total={recipesTotal} />
            )}
          </Grid.Col>
        </Grid>
      </Center>
      <FilteredOrPopularRecipesListMemo {...filteredOrPopularRecipesListProps} />
    </>
  );
};

AutoCompleteItem.displayName = "AutoCompleteItem";

export default Home;
