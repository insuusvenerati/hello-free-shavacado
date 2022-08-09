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
import { GetStaticProps } from "next";
import { forwardRef, useCallback, useEffect, useState } from "react";
import { RecipeQuery } from "types/recipes";
import { FilteredOrPopularRecipesList } from "../components/PopularFilteredRecipesList";
import { LazyRecipeModal } from "../components/RecipeModal";
import { useRecipesContext } from "../context/RecipesContext";
import { getPopularRecipes } from "../util/getPopularRecipes";
import { hellofreshGetToken } from "../util/hellofresh";

// export const getServerSideProps: GetServerSideProps = async ({ res }) => {
//   res.setHeader("Cache-Control", `public, s-maxage=60, stale-while-revalidate=${FIVE_MINUTES}`);
//   const queryClient = new QueryClient();
//   await queryClient.prefetchQuery(["popularRecipes"], getPopularRecipes);

//   return {
//     props: {
//       dehydratedState: dehydrate(queryClient),
//     },
//   };
// };

export const getStaticProps: GetStaticProps = async () => {
  const popularRecipes = await getPopularRecipes();

  return {
    props: { popularRecipes },
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

type Props = {
  popularRecipes: RecipeQuery;
};

const Home = ({ popularRecipes }: Props) => {
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
      <FilteredOrPopularRecipesList staticRecipes={popularRecipes} modalHandler={modalHandler} />
    </>
  );
};

AutoCompleteItem.displayName = "AutoCompleteItem";

export default Home;
