import type { CardProps } from "@mantine/core";
import { Group, Stack } from "@mantine/core";
import { Anchor, Badge, Card, createStyles, Text, Tooltip } from "@mantine/core";
import { Link } from "@remix-run/react";
import type { Hit } from "instantsearch.js";
import Image from "remix-image";
import type { Item } from "~/types/recipes";
import type { RecipeHit } from "~/types/recipeSearchQuery";
import { HF_CARD_IMAGE_URL } from "~/util/constants";
import { AddToFavorites } from "../Buttons/AddToFavorites";

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
    <Card sx={{ height: "auto" }} withBorder shadow="md" {...props}>
      <Card.Section mb="sm">
        <Image
          alt={recipe?.name}
          height={340}
          src={`${HF_CARD_IMAGE_URL}${recipe?.imagePath}`}
          width={600}
          style={{ objectFit: "cover", width: "100%", height: "auto" }}
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
