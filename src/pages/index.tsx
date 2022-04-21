import {
  Checkbox,
  FormElement,
  Grid,
  Input,
  Loading,
  Pagination,
  Text,
} from "@nextui-org/react";
import { getCookie, setCookies } from "cookies-next";
import Head from "next/head";
import Script from "next/script";
import { ChangeEvent, useCallback, useEffect, useMemo, useState } from "react";
import { useQuery } from "react-query";
import { Navbar1 } from "../components/Nav";
import { RecipeCard } from "../components/RecipeCard";
import { RecipeModal } from "../components/RecipeModal";
import { Item, RecipeQuery } from "../types/recipes";
import { hellofreshGetToken } from "../util/hellofresh";
import { useDebounce } from "../util/useDebounce";

export default function Home() {
  const [selectedAllergens, setSelectedAllergens] = useState<string[]>([]);
  const [visible, setVisible] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [selectedRecipe, setSelectedRecipe] = useState<Item>();
  const debouncedSearchText = useDebounce(searchText, 1000);
  const token = getCookie("token");
  const [page, setPage] = useState(1);

  const helperTextMessage = useMemo(
    () => `For best results, separate multiple ingredients by space`,
    []
  );

  const {
    data: recipes,
    isLoading,
    error,
    isError,
  } = useQuery(
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
      // select: (recipes) =>
      //   recipes?.items.filter((item) =>
      //     item.allergens.some(
      //       (allergen) => !selectedAllergens.includes(allergen.name)
      //     )
      //   ),
      staleTime: 1000 * 60 * 60,
      retry: 1,
    }
  );

  const [filteredRecipes, setFilteredRecipes] = useState<Item[]>([]);

  const allergens = [
    ...new Set(
      recipes?.items
        .map((item) => item.allergens.map((allergen) => allergen.name))
        .flat()
    ),
  ];

  // const filteredRecipes = recipes?.items.filter((item) =>
  //   item.allergens.some(
  //     (allergen) => !selectedAllergens.includes(allergen.name)
  //   )
  // )

  const excludesAllergens = (recipe: Item) => {
    return !recipe.allergens.some((allergen) =>
      selectedAllergens.includes(allergen.name)
    );
  };

  console.log(selectedAllergens);
  console.log("filtered recipes", filteredRecipes);

  const recipesTotal = useMemo(
    () => Math.floor(recipes?.total / 20),
    [recipes?.total]
  );

  const pageChangeHandler = useCallback((pageNumber: number) => {
    setPage(pageNumber);
  }, []);

  const onChangeHandler = useCallback(
    (event: ChangeEvent<FormElement>) => {
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

  const clearRecipesHandler = useCallback(() => {
    setFilteredRecipes([]);
  }, []);

  // Get token
  useEffect(() => {
    if (!token) {
      hellofreshGetToken()
        .then((token) => setCookies("token", token.access_token))
        .catch((e) => console.error(e));
    }
  }, [token]);

  useEffect(() => {
    setFilteredRecipes(
      recipes?.items.filter((item) =>
        item.allergens.every(
          (allergen) => !selectedAllergens.includes(allergen.name)
        )
      )
    ),
      () => setFilteredRecipes([]);
  }, [recipes?.items, selectedAllergens]);

  return (
    <>
      <Head>
        <title>Hello Free Shavacado</title>
        <meta
          name="description"
          content="Search for Hello Fresh recipes by ingredient"
        />
        <link rel="icon" href="/favicon-32x32.png" />
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
            onClearClick={clearRecipesHandler}
            labelPlaceholder="Ingredients"
            clearable
            fullWidth
            size="lg"
            // @ts-ignore
            helperText={isError ? error : helperTextMessage}
            helperColor={isError ? "error" : "default"}
            contentLeft={isLoading ? <Loading size="sm" /> : undefined}
          />
        </Grid>
        {allergens.length > 0 && (
          <Grid sm={2} xs={12}>
            <Checkbox.Group
              onChange={setSelectedAllergens}
              value={selectedAllergens}
              size="xs"
              row
              label="Filter allergens"
            >
              {allergens.map((allergen, index) => (
                <Checkbox key={index} value={allergen}>
                  {allergen}
                </Checkbox>
              ))}
            </Checkbox.Group>
          </Grid>
        )}
        {filteredRecipes?.length > 0 && (
          <Grid.Container justify="center">
            <Pagination
              page={page}
              total={recipesTotal}
              onChange={pageChangeHandler}
            />
          </Grid.Container>
        )}

        <Grid.Container gap={2} justify="center">
          {filteredRecipes?.length > 0 ? (
            filteredRecipes?.map((recipe: Item) => {
              return (
                <RecipeCard
                  key={recipe.id}
                  handler={modalHandler}
                  recipe={recipe}
                  setSelectedRecipe={setSelectedRecipe}
                />
              );
            })
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
