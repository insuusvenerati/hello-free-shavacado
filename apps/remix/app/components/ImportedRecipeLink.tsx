import { LinkIcon, TrashIcon } from "@heroicons/react/24/outline";
import { ActionIcon, Avatar, createStyles, Group, List, Paper, Text, Tooltip } from "@mantine/core";
import type { ImportedRecipe } from "@prisma/client";
import { Link } from "@remix-run/react";

const useStyles = createStyles((theme) => ({
  linkText: {
    maxWidth: 100,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    color: theme.colorScheme === "light" ? theme.primaryColor : "white",
  },
}));

export const ImportedRecipeLink = ({ recipe }: { recipe: ImportedRecipe }) => {
  const { classes } = useStyles();
  // const { mutate } = useDeleteImportedRecipeMutation();

  return (
    <Paper mb="md" shadow="xs" withBorder>
      <List.Item icon={<Avatar alt={recipe?.name} radius={0} size="lg" src={recipe?.image} />}>
        <Group noWrap>
          <Link to={recipe?.url} key={recipe?.id} target="_blank">
            <Tooltip label={recipe?.name} withArrow>
              <Text className={classes.linkText} size="sm">
                {recipe?.name}
              </Text>
            </Tooltip>
          </Link>
          <Tooltip label="Delete favorite" withArrow>
            <ActionIcon color="red">
              <TrashIcon />
            </ActionIcon>
          </Tooltip>
          <Link to={`/imported-recipe/${recipe.id}`}>
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
