import { useSession } from "@clerk/nextjs";
import { LinkIcon, TrashIcon } from "@heroicons/react/outline";
import { ActionIcon, Avatar, Group, List, Paper, Text, Tooltip } from "@mantine/core";
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
          <Tooltip
            style={{ maxWidth: 100, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}
            label={recipe?.items[0].name}
            withArrow
          >
            <NextLink href={recipe?.items[0]?.websiteUrl} key={favoritedRecipe?.id} target="_blank">
              <Text size="sm">{recipe?.items[0].name}</Text>
            </NextLink>
          </Tooltip>
          <Tooltip label="Delete favorite" withArrow>
            <ActionIcon color="red" onClick={mutate}>
              <TrashIcon />
            </ActionIcon>
          </Tooltip>
          <Tooltip label="View Instructions">
            <NextLink href={`/recipe/${favoritedRecipe?.recipe}`}>
              <ActionIcon mr="xs">
                <LinkIcon />
              </ActionIcon>
            </NextLink>
          </Tooltip>
        </Group>
      </List.Item>
    </Paper>
  );
};
