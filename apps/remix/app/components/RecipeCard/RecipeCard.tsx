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
    <Card sx={{ aspectRatio: "1/1" }} shadow="md" {...props}>
      <Card.Section mb="sm">
        <HellofreshImage
          alt={recipe.name}
          src={`${recipe.imagePath}`}
          height={340}
          width={600}
          style={{
            width: "100%",
            height: "auto",
            minHeight: "unset",
            objectFit: "cover",
            minWidth: "unset",
          }}
          dprVariants={[1, 2]}
          responsive={[
            {
              size: {
                width: 300,
                height: 170,
              },
              maxWidth: 1800,
            },
            {
              size: {
                width: 600,
                height: 340,
              },
              maxWidth: 2400,
            },
            {
              size: { width: 1200, height: 680 },
              maxWidth: 4800,
            },
          ]}
        />
      </Card.Section>
      <Stack sx={{ minHeight: 135 }} justify="space-between" spacing="xs">
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
