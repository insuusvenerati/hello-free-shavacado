import { RecipeCard } from "@components/RecipeCard";
import { Avatar, Center, Grid, Group, MantineColor, SelectItemProps, Text } from "@mantine/core";
import { getCookie, setCookies } from "cookies-next";
import { forwardRef, useEffect } from "react";
import { Hits, Pagination } from "react-instantsearch-hooks-web";
import { RecipeHit } from "types/recipeSearchQuery";
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

// export const getStaticProps: GetStaticProps = async () => {
//   const popularRecipes = await getPopularRecipes();

//   return {
//     props: { popularRecipes },
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

const HitComponent = ({ hit }: { hit: RecipeHit }) => {
  return <RecipeCard recipe={hit} />;
};

const Home = () => {
  const token = getCookie("hf-token") as string;

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
      <Center mb={5} mt={5}>
        <Grid columns={1} justify="center">
          <Grid.Col span={1}>
            <Pagination />
            {/* {recipesTotal && recipesTotal > 0 && (
              <Pagination onChange={pageChangeHandler} page={page} total={recipesTotal} />
            )} */}
          </Grid.Col>
        </Grid>
      </Center>

      {/* <Grid columns={4} justify="center"> */}
      <Hits hitComponent={HitComponent} />
      {/* </Grid> */}

      {/* <FilteredOrPopularRecipesList staticRecipes={popularRecipes} modalHandler={modalHandler} /> */}
    </>
  );
};

AutoCompleteItem.displayName = "AutoCompleteItem";

export default Home;
