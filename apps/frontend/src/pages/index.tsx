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
import { forwardRef, useCallback, useEffect, useState } from "react";
import { FilteredOrPopularRecipesList } from "../components/PopularFilteredRecipesList";
import { LazyRecipeModal } from "../components/RecipeModal";
import { useRecipesContext } from "../context/RecipesContext";
import { hellofreshGetToken } from "../util/hellofresh";

const ONE_DAY = 1000 * 86400;

// export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
//   const token = getCookie("hf-token", { req, res });
//   res.setHeader("Cache-Control", `public, s-maxage=10, stale-while-revalidate=${ONE_DAY}`);
//   const queryClient = new QueryClient();
//   await queryClient.prefetchQuery(["popularRecipes"], getPopularRecipes);
//   console.log("Prefetched popular recipes");

//   return {
//     props: {
//       dehydratedState: dehydrate(queryClient),
//     },
//   };
// };

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
  const token = getCookie("hf-token") as string;

  const { selectedRecipe, recipesTotal, pageChangeHandler, page } = useRecipesContext();

  const modalHandler = useCallback(() => {
    setModalVisible(!modalVisible);
  }, [modalVisible]);

  // Get token
  useEffect(() => {
    if (!token) {
      hellofreshGetToken()
        .then((token) =>
          setCookies("hf-token", token.access_token, {
            secure: false,
            sameSite: "lax",
            maxAge: 2629743,
          }),
        )
        .catch((e) => console.error(e));
    }
  }, [token]);

  return (
    <>
      <LazyRecipeModal onClose={modalHandler} opened={modalVisible} recipe={selectedRecipe} />
      <Center mb={5} mt={5}>
        <Grid columns={1} justify="center">
          <Grid.Col span={1}>
            {recipesTotal && recipesTotal > 0 && (
              <Pagination onChange={pageChangeHandler} page={page} total={recipesTotal} />
            )}
          </Grid.Col>
        </Grid>
      </Center>
      <FilteredOrPopularRecipesList modalHandler={modalHandler} />
    </>
  );
};

AutoCompleteItem.displayName = "AutoCompleteItem";

export default Home;
