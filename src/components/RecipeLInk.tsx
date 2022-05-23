import { useSession } from "@clerk/nextjs";
import { TrashIcon } from "@heroicons/react/outline";
import { ActionIcon, Group, List } from "@mantine/core";
import { NextLink } from "@mantine/next";
import { getCookie } from "cookies-next";
import { useDeleteFavoriteRecipe } from "../hooks/useDeleteFavoriteRecipe";
import { useHellofreshBySlug } from "../hooks/useHellofreshBySlug";
import { FavoritedRecipe } from "../util/getRecipes";

export const RecipeLink = ({ favoritedRecipe }: { favoritedRecipe: FavoritedRecipe }) => {
  const token = getCookie("token");
  const { data: recipe, isLoading } = useHellofreshBySlug(favoritedRecipe?.recipe, token.toString());
  const { session } = useSession();
  const { mutate } = useDeleteFavoriteRecipe(session, favoritedRecipe?.id);

  if (isLoading) return null;

  return (
    <Group align="center">
      <List.Item
        icon={
          <ActionIcon color="red" onClick={mutate}>
            <TrashIcon />
          </ActionIcon>
        }
      >
        <NextLink href={recipe?.items[0]?.websiteUrl} key={favoritedRecipe?.id} target="_blank">
          {recipe?.items[0].name}
        </NextLink>
      </List.Item>
    </Group>
  );
};
