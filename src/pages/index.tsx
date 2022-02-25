import Head from "next/head";
import { Navbar } from "../components/Nav";
import { Grid, Input, Loading, Text } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { getCookie, setCookies } from "cookies-next";
import { useDebounce } from "../util/useDebounce";
import { Item } from "../recipes";
import { RecipeCard } from "../components/RecipeCard";

const hellofreshGetToken = async () => {
  const response = await fetch(
    "https://www.hellofresh.com/gw/auth/token?client_id=senf&grant_type=client_credentials",
    { method: "POST" }
  );
  return await response.json();
};

const hellofreshSearch = async (searchText: string) => {
  const response = await fetch(
    `https://www.hellofresh.com/gw/recipes/recipes/search?limit=25&locale=en-US&country=US&q=${searchText}`,
    { headers: { authorization: `Bearer ${getCookie("token")}` } }
  );
  return await response.json();
};

export default function Home() {
  const [searchText, setSearchText] = useState("");
  const [recipes, setRecipes] = useState<Item[] | []>([]);
  const [loading, setLoading] = useState(false);
  const debouncedSearchText = useDebounce(searchText, 500);
  const token = getCookie("token");

  useEffect(() => {
    if (!token) {
      hellofreshGetToken()
        .then((token) => setCookies("token", token.access_token))
        .catch((e) => console.error(e));
    }
  }, []);

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

      <Navbar />

      <Grid.Container css={{ marginTop: "10px" }} gap={2} justify="center">
        <Grid>
          <main>
            <Input
              onChange={(event) => setSearchText(event.target.value)}
              labelPlaceholder="Ingredient"
            />
          </main>
        </Grid>
        <Grid.Container gap={2} justify="center">
          {recipes.length !== 0 ? (
            recipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
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
