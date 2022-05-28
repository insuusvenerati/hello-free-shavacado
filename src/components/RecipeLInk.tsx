import { useSession } from "@clerk/nextjs";
import { TrashIcon } from "@heroicons/react/outline";
import { ActionIcon, Avatar, Group, List, Paper } from "@mantine/core";
import { NextLink } from "@mantine/next";
import { useDeleteFavoriteRecipe } from "../hooks/useDeleteFavoriteRecipe";
import { useHellofreshBySlug } from "../hooks/useHellofreshBySlug";
import { HF_AVATAR_IMAGE_URL } from "../util/constants";
import { FavoritedRecipe } from "../util/getRecipes";

export const RecipeLink = ({ favoritedRecipe }: { favoritedRecipe: FavoritedRecipe }) => {
  const { data: recipe, isLoading } = useHellofreshBySlug(favoritedRecipe?.recipe);
  const { session } = useSession();
  const { mutate } = useDeleteFavoriteRecipe(session, favoritedRecipe?.id);

  if (isLoading) return null;

  return (
    <Paper mb="md" shadow="xs" withBorder>
      <List.Item
        icon={
          <Avatar
            alt={favoritedRecipe.name}
            radius={0}
            size="lg"
            src={`${HF_AVATAR_IMAGE_URL}${favoritedRecipe?.image_path}`}
          />
        }
      >
        <Group noWrap>
          <NextLink href={recipe?.items[0]?.websiteUrl} key={favoritedRecipe?.id} target="_blank">
            {recipe?.items[0].name}
          </NextLink>
          <ActionIcon color="red" mr="xs" onClick={mutate}>
            <TrashIcon />
          </ActionIcon>
        </Group>
      </List.Item>
    </Paper>
  );
};
