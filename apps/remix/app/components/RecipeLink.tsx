import { LinkIcon, TrashIcon } from "@heroicons/react/24/outline";
import { ActionIcon, Avatar, createStyles, Group, List, Paper, Text, Tooltip } from "@mantine/core";
import { Link } from "@remix-run/react";
import type { FavoritedRecipe } from "~/types/favoriteRecipe";
import { HF_AVATAR_IMAGE_URL } from "~/util/constants";

const useStyles = createStyles((theme) => ({
  linkText: {
    maxWidth: 100,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
}));

export const RecipeLink = ({
  favoritedRecipe,
  recipe,
}: {
  favoritedRecipe: FavoritedRecipe;
  recipe: any;
}) => {
  const { classes } = useStyles();

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
          {/* <Link to={recipe.websiteUrl} target="_blank">
            <Tooltip label={recipe.name} withArrow> */}
          <Text className={classes.linkText} size="sm">
            {favoritedRecipe.name}
          </Text>
          {/* </Tooltip>
          </Link> */}
          {/* <Tooltip label="Delete favorite" withArrow>
            <ActionIcon color="red" onClick={mutate}>
              <TrashIcon />
            </ActionIcon>
          </Tooltip> */}
          <Link to={`/recipe/${favoritedRecipe?.uuid}`}>
            <Tooltip label="View Instructions">
              <ActionIcon mr="xs">
                <LinkIcon />
              </ActionIcon>
            </Tooltip>
          </Link>
        </Group>
      </List.Item>
    </Paper>
  );
};
