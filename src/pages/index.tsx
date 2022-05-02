import {
  Center,
  Container,
  Drawer,
  Grid,
  Loader,
  MultiSelect,
  Pagination,
  Text,
  TextInput,
} from "@mantine/core";
import { getCookie, setCookies } from "cookies-next";
import ky from "ky";
import Head from "next/head";
import Script from "next/script";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useQuery } from "react-query";
import { Navbar1 } from "../components/Nav";
import { RecipeCard } from "../components/RecipeCard";
import RecipeModal from "../components/RecipeModal";
import { Item, RecipeQuery } from "../types/recipes";
import { hellofreshGetToken } from "../util/hellofresh";
import { useDebounce } from "../util/useDebounce";

const Home = () => {
  const [selectedAllergens, setSelectedAllergens] = useState<string[]>([]);
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const [selectedRecipe, setSelectedRecipe] = useState<Item>();
  const [visible, setVisible] = useState(false);
  const [searchText, setSearchText] = useState("");
  const debouncedSearchText = useDebounce<string>(searchText, 1000);
  const token = getCookie("token");
  const [page, setPage] = useState(1);
  const [opened, setOpened] = useState(false);

  const {
    data: recipes,
    isLoading,
    error,
    isError,
  } = useQuery<RecipeQuery, Error>(
    ["recipes", token, debouncedSearchText, page],
    async (): Promise<RecipeQuery> => {
      const response = await ky
        .get(
          `/api/hellofresh?token=${token}&searchText=${debouncedSearchText}&page=${page}`,
        )
        .json<RecipeQuery>();

      return response;
    },
    {
      enabled: !!token && !!debouncedSearchText,
      staleTime: 1000 * 60 * 60,
      retry: false,
    },
  );

  const allergens = [
    ...new Set(
      recipes?.items
        ?.map((item) => item.allergens.map((allergen) => allergen.name))
        .flat(),
    ),
  ];

  const ingredientFilter = useCallback(
    (recipe: Item) => {
      if (recipe && selectedIngredients.length > 0) {
        return recipe.ingredients.some((ingredient) =>
          selectedIngredients.includes(ingredient.name),
        );
      }
      return true;
    },
    [selectedIngredients],
  );

  const allergenFilter = useCallback(
    (recipe: Item) => {
      if (recipe && selectedAllergens.length > 0) {
        return recipe.allergens.every(
          (ingredient) => !selectedAllergens.includes(ingredient.name),
        );
      }
      return true;
    },
    [selectedAllergens],
  );

  const filteredRecipes = useMemo(() => {
    return recipes?.items.filter(
      (item) => allergenFilter(item) && ingredientFilter(item),
    );
  }, [ingredientFilter, allergenFilter, recipes?.items]);

  const recipesTotal = useMemo(
    () => Math.floor(recipes?.total / 20),
    [recipes?.total],
  );

  const ingredients = [
    ...new Set(
      recipes?.items
        ?.map((recipe) =>
          recipe.ingredients.map((ingredient) => ingredient.name),
        )
        .flat(),
    ),
  ];

  const pageChangeHandler = useCallback((pageNumber: number) => {
    setPage(pageNumber);
  }, []);

  const onChangeHandler = useCallback(
    (event) => {
      setSearchText(event.target.value);
    },
    [setSearchText],
  );

  const modalHandler = useCallback(() => {
    setVisible(true);
  }, [setVisible]);

  const closeHandler = useCallback(() => {
    setVisible(false);
  }, [setVisible]);

  const handleDrawer = useCallback(() => {
    setOpened(!opened);
  }, [opened]);

  const handleSetSelectedIngredients = useCallback((value: string[]) => {
    setSelectedIngredients(value);
  }, []);

  const handleSetSelectedAllergens = useCallback((value: string[]) => {
    setSelectedAllergens(value);
  }, []);

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
          content="Search for Hello Fresh recipes by ingredient"
          name="description"
        />
        <link href="/favicon-32x32.png" rel="icon" />
      </Head>

      <Script
        async
        data-website-id="679de944-0e27-4e1e-aa33-efc4feddd5bb"
        defer
        src="https://analytics.stiforr.tech/umami.js"
      />

      <Navbar1 handleDrawer={handleDrawer} opened={opened} />

      <RecipeModal
        onClose={closeHandler}
        opened={visible}
        recipe={selectedRecipe}
      />
      <Container fluid>
        {allergens.length > 0 && (
          <Drawer
            onClose={handleDrawer}
            opened={opened}
            padding="xl"
            size="xl"
            title="Sort & Filter"
          >
            <MultiSelect
              clearable
              data={allergens}
              label="Filter allergens"
              onChange={handleSetSelectedAllergens}
              placeholder="Select an allergen"
              searchable
              value={selectedAllergens}
            />
            <MultiSelect
              clearable
              data={ingredients}
              label="Filter ingredients"
              onChange={handleSetSelectedIngredients}
              placeholder="Select your ingredients"
              searchable
              value={selectedIngredients}
            />
          </Drawer>
        )}
        <Grid justify="center">
          <Grid.Col lg={6} md={12}>
            <TextInput
              error={isError && error.message}
              label="Search"
              onChange={onChangeHandler}
              placeholder="Search"
              rightSection={isLoading ? <Loader size="sm" /> : undefined}
              size="md"
            />
          </Grid.Col>
        </Grid>
        <Center mb={5} mt={5}>
          <Grid columns={1} justify="center">
            <Grid.Col span={1}>
              {recipesTotal > 0 && (
                <Pagination
                  onChange={pageChangeHandler}
                  page={page}
                  total={recipesTotal}
                />
              )}
            </Grid.Col>
          </Grid>
        </Center>
        <Grid columns={4} justify="center">
          {filteredRecipes !== undefined ? (
            filteredRecipes?.map((recipe) => {
              return (
                <Grid.Col key={recipe.id} md={1} sm={2}>
                  <RecipeCard
                    handler={modalHandler}
                    recipe={recipe}
                    setSelectedRecipe={setSelectedRecipe}
                  />
                </Grid.Col>
              );
            })
          ) : (
            <Grid.Col sm={1}>
              <Text size="xl" weight={500}>
                Search for some great recipes! I believe in you
              </Text>
            </Grid.Col>
          )}
        </Grid>
      </Container>
    </>
  );
};

export default Home;
