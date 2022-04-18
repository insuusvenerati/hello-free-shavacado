import { Grid, Input, Text } from "@nextui-org/react";
import { getCookie, setCookies } from "cookies-next";
import Head from "next/head";
import Script from "next/script";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Navbar } from "../components/Nav";
import { RecipeCard } from "../components/RecipeCard";
import { RecipeModal } from "../components/RecipeModal";
import { Item, Recipes } from "../recipes";
import { hellofreshGetToken } from "../util/hellofresh";
import { useDebounce } from "../util/useDebounce";

export default function Home() {
  const [visible, setVisible] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [selectedRecipe, setSelectedRecipe] = useState<Item>();
  const debouncedSearchText = useDebounce(searchText, 500);
  const token = getCookie("token");
  const { data: recipes } = useQuery(
    ["recipes", token, debouncedSearchText],
    async (): Promise<Recipes> => {
      const response = await fetch(
        `/api/hellofresh?token=${token}&searchText=${debouncedSearchText}`
      );
      return response.json();
    },
    {
      enabled: !!token && !!debouncedSearchText,
    }
  );

  const modalHandler = () => setVisible(true);
  const closeHandler = () => setVisible(false);

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
        <Grid sm={6} xs={12}>
          <Input
            onChange={(event) => setSearchText(event.target.value)}
            labelPlaceholder="Ingredient"
            clearable
            fullWidth
            size="lg"
          />
        </Grid>
        <Grid.Container gap={2} justify="center">
          {recipes?.items.length > 0 ? (
            recipes?.items.map((recipe: Item) => (
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
