import { Badge, Card, CardProps, Container, LoadingOverlay, Text } from "@mantine/core";
import { Hit } from "instantsearch.js";
import Image from "next/image";
import { Item } from "types/recipes";
import { RecipeHit } from "types/recipeSearchQuery";
import { HF_CARD_IMAGE_URL, HF_PLACEHOLDERURL } from "../../util/constants";
import { AddToFavorites } from "../Buttons/AddToFavorites";
import { CustomNextLink } from "../CustomNextLink";

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
          blurDataURL={`${HF_PLACEHOLDERURL}${recipe.imagePath}`}
        />
      </Card.Section>

      <CustomNextLink href={`/recipe/${recipe?.id}`}>
        <Text weight="bold">{recipe?.name}</Text>
      </CustomNextLink>

      {recipe?.tags?.length > 0 &&
        recipe?.tags?.map((tag) => (
          <Badge key={`${recipe?.id}-${tag?.id}}`} size="xs">
            {tag.name}
          </Badge>
        ))}
      <AddToFavorites
        fullWidth
        selectedRecipe={recipe}
        sx={{ marginTop: "14px" }}
        variant="light"
      />
    </Card>
  );
};
