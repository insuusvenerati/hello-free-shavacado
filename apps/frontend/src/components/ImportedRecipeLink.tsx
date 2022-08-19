import { LinkIcon, TrashIcon } from "@heroicons/react/outline";
import { ActionIcon, Avatar, createStyles, Group, List, Paper, Text, Tooltip } from "@mantine/core";
import { useDeleteImportedRecipeMutation } from "../hooks/useDeleteImportedRecipeMutation";
import { ImportedRecipe } from "../types/importedRecipe";
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

export const ImportedRecipeLink = ({ recipe }: { recipe: ImportedRecipe }) => {
  const { classes } = useStyles();
  const { mutate } = useDeleteImportedRecipeMutation();

  return (
    <Paper mb="md" shadow="xs" withBorder>
      <List.Item icon={<Avatar alt={recipe?.name} radius={0} size="lg" src={recipe?.image} />}>
        <Group noWrap>
          <CustomNextLink href={recipe?.url} key={recipe?.id} target="_blank">
            <Tooltip label={recipe?.name} withArrow>
              <Text className={classes.linkText} size="sm">
                {recipe?.name}
              </Text>
            </Tooltip>
          </CustomNextLink>
          <Tooltip label="Delete favorite" withArrow>
            <ActionIcon onClick={() => mutate(recipe?.id)} color="red">
              <TrashIcon />
            </ActionIcon>
          </Tooltip>
          <CustomNextLink href={`/imported-recipe/${recipe?.id}`}>
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
