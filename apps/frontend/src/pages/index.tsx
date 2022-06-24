import { useUser } from "@clerk/nextjs";
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
import LogRocket from "logrocket";
import { GetServerSideProps } from "next";
import { forwardRef, useCallback, useEffect, useState } from "react";
import { dehydrate, QueryClient } from "react-query";
import { Layout } from "../components/Layout";
import { FilteredOrPopularRecipesList } from "../components/PopularFilteredRecipesList";
import RecipeModal from "../components/RecipeModal";
import { usePopularRecipesQuery } from "../hooks/usePopularRecipesQuery";
import { useRecipes } from "../hooks/useRecipes";
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
  const { user } = useUser();
  const { data: popularRecipes } = usePopularRecipesQuery();
  // const [autocompleteData, setAutocompleteData] = useState([]);
  // const {
  //   data: suggestedRecipes,
  //   searchText: suggestedRecipeSearchText,
  //   setSearchText,
  // } = useSuggestedRecipesQuery();

  // useEffect(() => {
  //   const autoCompleteData = suggestedRecipes?.items
  //     ?.map((item) => {
  //       return item.items.map((i) => {
  //         const image = i.image.replace(
  //           "https://d3hvwccx09j84u.cloudfront.net/80,80",
  //           `${HF_AVATAR_IMAGE_URL}`,
  //         );
  //         return {
  //           value: i.title,
  //           description: i.headline,
  //           image: image,
  //         };
  //       });
  //     })
  //     .flat();
  //   setAutocompleteData(autoCompleteData);
  // }, [suggestedRecipes?.items]);

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
    active,
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
            <form onSubmit={onSubmitHandler}>
              {/* <Autocomplete
                label="Search"
                placeholder="Search for ingredients"
                itemComponent={AutoCompleteItem}
                data={autocompleteData ? autocompleteData : []}
                value={suggestedRecipeSearchText}
                onChange={setSearchText}
                onItemSubmit={onItemSubmitHandler}
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
              /> */}
              <TextInput
                value={searchText}
                error={isError && error.message}
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
              {recipesTotal > 0 && (
                <Pagination onChange={pageChangeHandler} page={active} total={recipesTotal} />
              )}
            </Grid.Col>
          </Grid>
        </Center>
        <FilteredOrPopularRecipesList {...FilteredOrPopularRecipesListProps} />
      </Layout>
    </>
  );
};

AutoCompleteItem.displayName = "AutoCompleteItem";

export default Home;
