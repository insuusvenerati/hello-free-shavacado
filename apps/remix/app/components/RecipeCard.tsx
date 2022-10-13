import type { CardProps } from "@mantine/core";
import { Badge, Card, Container, Image, LoadingOverlay, Text } from "@mantine/core";
import { Link } from "@remix-run/react";
import type { Hit } from "instantsearch.js";
import type { Item } from "~/types/recipes";
import type { RecipeHit } from "~/types/recipeSearchQuery";
import { HF_CARD_IMAGE_URL } from "~/util/constants";

type Props = {
  recipe: Hit<RecipeHit> | Item;
} & Omit<CardProps, "children">;

export const RecipeCard = ({ recipe, ...props }: Props) => {
  if (!recipe) {
    return (
      <Container>
        <LoadingOverlay visible />
      </Container>
    );
  }

  return (
    <Card shadow="md" {...props}>
      <Card.Section mb="sm">
        <Image
          alt={recipe?.name}
          height={340}
          src={`${HF_CARD_IMAGE_URL}${recipe?.imagePath}`}
          width={600}
          // blurDataURL={`${HF_PLACEHOLDERURL}${recipe.imagePath}`}
        />
      </Card.Section>

      <Link to={`/recipe/${recipe?.id}`}>
        <Text weight="bold">{recipe?.name}</Text>
      </Link>

      {recipe?.tags?.length > 0 &&
        recipe?.tags?.map((tag) => (
          <Badge key={`${recipe?.id}-${tag?.id}}`} size="xs">
            {tag.name}
          </Badge>
        ))}
      {/* <AddToFavorites
        fullWidth
        selectedRecipe={recipe}
        sx={{ marginTop: "14px" }}
        variant="light"
      /> */}
    </Card>
  );
};
