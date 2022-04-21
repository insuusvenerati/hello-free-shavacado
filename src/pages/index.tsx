import { Grid, Input, Loading, Pagination, Text } from "@nextui-org/react";
import { getCookie, setCookies } from "cookies-next";
import Head from "next/head";
import Script from "next/script";
import { useCallback, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Navbar1 } from "../components/Nav";
import { RecipeCard } from "../components/RecipeCard";
import { RecipeModal } from "../components/RecipeModal";
import { Item, RecipeQuery } from "../types/recipes";
import { hellofreshGetToken } from "../util/hellofresh";
import { useDebounce } from "../util/useDebounce";

export default function Home() {
  const [visible, setVisible] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [selectedRecipe, setSelectedRecipe] = useState<Item>();
  const debouncedSearchText = useDebounce(searchText, 500);
  const token = getCookie("token");
  const [page, setPage] = useState(1);

  const {
    data: recipes,
    isLoading,
    error,
    isError,
  } = useQuery<RecipeQuery, Error>(
    ["recipes", token, debouncedSearchText, page],
    async (): Promise<RecipeQuery> => {
      const response = await fetch(
        `/api/hellofresh?token=${token}&searchText=${debouncedSearchText}&page=${page}`
      );

      if (!response.ok) {
        throw new Error(`Unable to get recipes. Is Hellofresh down? 😔`);
      }

      return await response.json();
    },
    {
      enabled: !!token && !!debouncedSearchText,
      staleTime: 1000 * 60 * 60,
      retry: 1,
    }
  );

  const pageChangeHandler = useCallback((pageNumber: number) => {
    setPage(pageNumber);
  }, []);

  const onChangeHandler = useCallback(
    (event) => {
      setSearchText(event.target.value);
    },
    [setSearchText]
  );

  const modalHandler = useCallback(() => {
    setVisible(true);
  }, [setVisible]);

  const closeHandler = useCallback(() => {
    setVisible(false);
  }, [setVisible]);

  // Get token
  useEffect(() => {
    if (!token) {
      hellofreshGetToken()
        .then((token) => setCookies("token", token.access_token))
        .catch((e) => console.error(e));
    }
  }, [token]);

  return (
    <>
      <Head>
        <title>Hello Free Shavacado</title>
        <meta
          name="description"
          content="Search for Hello Fresh recipes by ingredient"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Script
        async
        defer
        src="https://analytics.stiforr.tech/umami.js"
        data-website-id="679de944-0e27-4e1e-aa33-efc4feddd5bb"
      />

      <Navbar1 />

      <RecipeModal
        recipe={selectedRecipe}
        blur
        open={visible}
        onClose={closeHandler}
        width={1200}
        closeButton
      />

      <Grid.Container gap={2} justify="center">
        <Grid sm={6} xs={12}>
          <Input
            onChange={onChangeHandler}
            labelPlaceholder="Ingredient"
            clearable
            fullWidth
            size="lg"
            helperText={isError ? error.message : undefined}
            helperColor="error"
            contentLeft={isLoading ? <Loading size="sm" /> : undefined}
          />
        </Grid>
        {recipes?.items?.length > 0 && (
          <Grid.Container justify="center">
            <Pagination
              page={page}
              total={Math.floor(recipes?.total / 20)}
              onChange={pageChangeHandler}
            />
          </Grid.Container>
        )}

        <Grid.Container gap={2} justify="center">
          {recipes?.items?.length > 0 ? (
            recipes?.items?.map((recipe: Item) => (
              <RecipeCard
                key={recipe.id}
                handler={modalHandler}
                recipe={recipe}
                setSelectedRecipe={setSelectedRecipe}
              />
            ))
          ) : (
            <Grid>
              <Text h4>
                Search for some great ingredients! I believe in you
              </Text>
            </Grid>
          )}
        </Grid.Container>
      </Grid.Container>
    </>
  );
}
