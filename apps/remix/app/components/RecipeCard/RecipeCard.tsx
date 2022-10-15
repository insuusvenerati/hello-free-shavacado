import type { CardProps } from "@mantine/core";
import { Anchor, Badge, Card, createStyles, Group, Stack, Text, Tooltip } from "@mantine/core";
import { Link } from "@remix-run/react";
import type { Hit } from "instantsearch.js";
import type { Item } from "~/types/recipes";
import type { RecipeHit } from "~/types/recipeSearchQuery";
import { AddToFavorites } from "../Buttons/AddToFavorites";
import { HellofreshImage } from "../HellofreshImage";

const useStyles = createStyles((theme) => ({
  linkText: {
    maxWidth: 350,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  descriptionText: {
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
}));

type Props = {
  recipe: Hit<RecipeHit> | Item;
} & Omit<CardProps, "children">;

export const RecipeCard = ({ recipe, ...props }: Props) => {
  const { classes } = useStyles();

  return (
    <Card withBorder shadow="md" {...props}>
      <Card.Section mb="sm">
        <HellofreshImage
          alt={recipe?.name}
          // placeholder="blur"
          height={340}
          src={`${recipe?.imagePath}`}
          width={600}
          style={{
            minWidth: "100%",
            minHeight: "100%",
            height: "100%",
            objectFit: "cover",
            width: "100%",
          }}
          dprVariants={[1, 3]}
          responsive={[
            {
              size: {
                width: 600,
                height: 340,
              },
            },
          ]}
        />
      </Card.Section>
      <Stack sx={{ height: 125 }} justify="space-between" spacing="xs">
        <Anchor component={Link} to={`/recipe/${recipe?.id}`}>
          <Tooltip label={recipe.name} withArrow>
            <Text className={classes.linkText} weight="bold">
              {recipe?.name}
            </Text>
          </Tooltip>
        </Anchor>

        <Text className={classes.descriptionText} size="sm" color="dimmed">
          {recipe.description}
        </Text>

        <Group>
          {recipe?.tags?.length > 0
            ? recipe?.tags?.map((tag) => (
                <Badge key={`${recipe?.id}-${tag?.id}}`} size="xs">
                  {tag.name}
                </Badge>
              ))
            : null}
        </Group>

        <AddToFavorites fullWidth selectedRecipe={recipe} variant="light" />
      </Stack>
    </Card>
  );
};
