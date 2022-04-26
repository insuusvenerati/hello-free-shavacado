import {
  Center,
  Container,
  Drawer,
  Grid,
  Loader,
  MultiSelect,
  Pagination,
  TextInput,
} from "@mantine/core";
import { FormElement, Text } from "@nextui-org/react";
import { getCookie, setCookies } from "cookies-next";
import ky from "ky";
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

const Home = () => {
  const [selectedAllergens, setSelectedAllergens] = useState<string[]>([]);
  const [visible, setVisible] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [selectedRecipe, setSelectedRecipe] = useState<Item>();
  const debouncedSearchText = useDebounce(searchText, 1000);
  const token = getCookie("token");
  const [page, setPage] = useState(1);
  const [opened, setOpened] = useState(false);
  const [selectedIngredients, setSelectedIngredients] = useState([]);

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

  const filteredRecipes = recipes?.items.filter((item) =>
    item.allergens.every(
      (allergen) => !selectedAllergens.includes(allergen.name),
    ),
  );

  const recipesTotal = useMemo(
    () => Math.floor(recipes?.total / 20),
    [recipes?.total],
  );

  const ingredients = [
    ...new Set(
      filteredRecipes
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
    (event: ChangeEvent<FormElement>) => {
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

  console.log(selectedIngredients);

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
        blur
        closeButton
        onClose={closeHandler}
        open={visible}
        recipe={selectedRecipe}
        width={1200}
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
            {filteredRecipes?.length > 0 && (
              <Grid.Col span={1}>
                <Pagination
                  onChange={pageChangeHandler}
                  page={page}
                  total={recipesTotal}
                />
              </Grid.Col>
            )}
          </Grid>
        </Center>
        <Grid columns={4} justify="center">
          {filteredRecipes?.length > 0 ? (
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
            <Grid.Col xs={12}>
              <Text h4>
                Search for some great ingredients! I believe in you
              </Text>
            </Grid.Col>
          )}
        </Grid>
      </Container>
    </>
  );
};

export default Home;
