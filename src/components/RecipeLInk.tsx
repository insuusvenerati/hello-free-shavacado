import { List } from "@mantine/core";
import { NextLink } from "@mantine/next";
import { getCookie } from "cookies-next";
import { Bookmark } from "tabler-icons-react";
import { useHellofreshBySlug } from "../hooks/useHellofreshBySlug";
import { FavoritedRecipe } from "../util/getRecipes";

export const RecipeLink = ({ favoritedRecipe }: { favoritedRecipe: FavoritedRecipe }) => {
  const token = getCookie("token");
  const { data: recipe, isLoading } = useHellofreshBySlug(favoritedRecipe?.recipe, token.toString());

  if (isLoading) return <h4>Loading...</h4>;

  return (
    <NextLink href={recipe?.items[0]?.websiteUrl} key={favoritedRecipe.id} target="_blank">
      <List.Item icon={<Bookmark />}>{favoritedRecipe.recipe}</List.Item>
    </NextLink>
  );
};
