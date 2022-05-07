import { useSession } from "@clerk/nextjs";
import { ActionIcon, Group, List, Loader } from "@mantine/core";
import { NextLink } from "@mantine/next";
import { getCookie } from "cookies-next";
import { Trash } from "tabler-icons-react";
import { useDeleteFavoriteRecipe } from "../hooks/useDeleteFavoriteRecipe";
import { useHellofreshBySlug } from "../hooks/useHellofreshBySlug";
import { FavoritedRecipe } from "../util/getRecipes";

export const RecipeLink = ({ favoritedRecipe }: { favoritedRecipe: FavoritedRecipe }) => {
  const token = getCookie("token");
  const { data: recipe, isLoading } = useHellofreshBySlug(favoritedRecipe?.recipe, token.toString());
  const { session } = useSession();
  const { mutate } = useDeleteFavoriteRecipe(session, favoritedRecipe?.id);

  if (isLoading) {
    return (
      <List.Item>
        <Loader variant="dots" />
      </List.Item>
    );
  }

  return (
    <Group align="center">
      <List.Item
        icon={
          <ActionIcon color="red" onClick={mutate}>
            <Trash />
          </ActionIcon>
        }
      >
        <NextLink href={recipe?.items[0]?.websiteUrl} key={favoritedRecipe.id} target="_blank">
          {recipe?.items[0].name}
        </NextLink>
      </List.Item>
    </Group>
  );
};
