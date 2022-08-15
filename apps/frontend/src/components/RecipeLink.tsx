import { LinkIcon, TrashIcon } from "@heroicons/react/outline";
import { ActionIcon, Avatar, createStyles, Group, List, Paper, Text, Tooltip } from "@mantine/core";
import { useGetRecipeById } from "hooks/useGetRecipeById";
import { useDeleteFavoriteRecipe } from "../hooks/useDeleteFavoriteRecipe";
import { FavoritedRecipe } from "../types/favoriteRecipe";
import { HF_AVATAR_IMAGE_URL } from "../util/constants";
import { CustomNextLink } from "./CustomNextLink";

const useStyles = createStyles((theme) => ({
  linkText: {
    maxWidth: 100,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    color: theme.colorScheme === "light" ? theme.primaryColor : "white",
  },
}));

export const RecipeLink = ({ favoritedRecipe }: { favoritedRecipe: FavoritedRecipe }) => {
  const { data: recipe, isSuccess } = useGetRecipeById(favoritedRecipe?.uuid);
  const { mutate } = useDeleteFavoriteRecipe(favoritedRecipe.id);
  const { classes } = useStyles();

  if (!isSuccess) return null;

  return (
    <Paper mb="md" shadow="xs" withBorder>
      <List.Item
        icon={
          <Avatar
            alt={favoritedRecipe.name}
            radius={0}
            size="lg"
            src={`${HF_AVATAR_IMAGE_URL}${favoritedRecipe?.imagePath}`}
          />
        }
      >
        <Group noWrap>
          <CustomNextLink href={recipe.websiteUrl} key={favoritedRecipe?.id} target="_blank">
            <Tooltip label={recipe.name} withArrow>
              <Text className={classes.linkText} size="sm">
                {recipe.name}
              </Text>
            </Tooltip>
          </CustomNextLink>
          <Tooltip label="Delete favorite" withArrow>
            <ActionIcon color="red" onClick={mutate}>
              <TrashIcon />
            </ActionIcon>
          </Tooltip>
          <CustomNextLink href={`/recipe/${favoritedRecipe?.uuid}`}>
            <Tooltip label="View Instructions">
              <ActionIcon mr="xs">
                <LinkIcon />
              </ActionIcon>
            </Tooltip>
          </CustomNextLink>
        </Group>
      </List.Item>
    </Paper>
  );
};
