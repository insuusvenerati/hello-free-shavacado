import { LinkIcon, TrashIcon } from "@heroicons/react/outline";
import { ActionIcon, Avatar, Group, List, Paper, Text, Tooltip } from "@mantine/core";
import { NextLink } from "@mantine/next";
import { useDeleteImportedRecipeMutation } from "../hooks/useDeleteImportedRecipeMutation";
import { ImportedRecipe } from "../types/importedRecipe";

export const ImportedRecipeLink = ({ recipe }: { recipe: ImportedRecipe }) => {
  const { mutate } = useDeleteImportedRecipeMutation();
  return (
    <Paper mb="md" shadow="xs" withBorder>
      <List.Item icon={<Avatar alt={recipe?.name} radius={0} size="lg" src={recipe?.image} />}>
        <Group noWrap>
          <Tooltip
            style={{
              maxWidth: 100,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
            label={recipe?.name}
            withArrow
          >
            <NextLink href={recipe?.url} key={recipe?.id} target="_blank">
              <Text size="sm">{recipe?.name}</Text>
            </NextLink>
          </Tooltip>
          <Tooltip label="Delete favorite" withArrow>
            <ActionIcon onClick={() => mutate(recipe?.id)} color="red">
              <TrashIcon />
            </ActionIcon>
          </Tooltip>
          <Tooltip label="View Instructions">
            <NextLink href={`/imported-recipe/${recipe?.id}`}>
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
