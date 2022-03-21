import { Grid, Input, Loading, Text } from "@nextui-org/react";
import { getCookie, setCookies } from "cookies-next";
import Head from "next/head";
import Script from "next/script";
import { useEffect, useState } from "react";
import { Navbar } from "../components/Nav";
import { RecipeCard } from "../components/RecipeCard";
import { RecipeModal } from "../components/RecipeModal";
import { Allergen, Item, Recipes } from "../recipes";
import { useDebounce } from "../util/useDebounce";

const hellofreshGetToken = async () => {
  const response = await fetch(
    "https://www.hellofresh.com/gw/auth/token?client_id=senf&grant_type=client_credentials",
    { method: "POST" }
  );
  return await response.json();
};

const hellofreshSearch = async (searchText: string): Promise<Recipes> => {
  const response = await fetch(
    `https://www.hellofresh.com/gw/recipes/recipes/search?limit=25&locale=en-US&country=US&q=${searchText}`,
    { headers: { authorization: `Bearer ${getCookie("token")}` } }
  );
  return await response.json();
};

export default function Home() {
  const [visible, setVisible] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [recipes, setRecipes] = useState<Item[] | []>([]);
  const [selectedRecipe, setSelectedRecipe] = useState<Item>();
  const [allergens, setAllergens] = useState<Allergen[] | []>([]);
  const [loading, setLoading] = useState(false);
  const debouncedSearchText = useDebounce(searchText, 500);
  const token = getCookie("token");

  const modalHandler = () => setVisible(true);
  const closeHandler = () => setVisible(false);
  const recipeHandler = (recipe) => setSelectedRecipe(recipe);

  // Get token
  useEffect(() => {
    if (!token) {
      hellofreshGetToken()
        .then((token) => setCookies("token", token.access_token))
        .catch((e) => console.error(e));
    }
  }, [token]);

  // Search recipes
  useEffect(() => {
    if (debouncedSearchText) {
      hellofreshSearch(debouncedSearchText)
        .then((results) => {
          setLoading(true);
          setRecipes(results.items);
        })
        .catch((e) => console.error(e))
        .finally(() => setLoading(false));
    } else {
      setRecipes([]);
      setLoading(false);
    }
  }, [debouncedSearchText]);

  // Pull allergens from recipes
  // useEffect(() => {
  //   recipes.map((recipe) => setAllergens(recipe.allergens));
  //   return () => setAllergens([]);
  // }, [recipes]);

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
        src="https://analytics.stiforr.tech/umami.js"
        strategy="lazyOnload"
      />

      <Navbar />

      <RecipeModal
        recipe={selectedRecipe}
        blur
        open={visible}
        onClose={closeHandler}
        width={1200}
      />

      <Grid.Container css={{ marginTop: "10px" }} gap={2} justify="center">
        <Grid>
          <Input
            onChange={(event) => setSearchText(event.target.value)}
            labelPlaceholder="Ingredient"
            clearable
          />
        </Grid>
        <Grid.Container gap={2} justify="center">
          {recipes.length > 0 ? (
            recipes.map((recipe: Item) => (
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
          <Grid>{loading && <Loading />}</Grid>
        </Grid.Container>
      </Grid.Container>
    </>
  );
}
