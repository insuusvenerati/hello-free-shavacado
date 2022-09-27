import { Badge, Card, CardProps, Container, LoadingOverlay, Text } from "@mantine/core";
import { Hit } from "instantsearch.js";
import Image from "next/image";
import { ImportedRecipe, isImportedRecipe } from "types/importedRecipe";
import { Item, Tag } from "types/recipes";
import { RecipeHit } from "types/recipeSearchQuery";
import { AddToFavorites } from "./Buttons/AddToFavorites";
import { CustomNextLink } from "./CustomNextLink";
import { RecipeCardImage } from "./RecipeCardImage";
import { HF_CARD_IMAGE_URL, HF_PLACEHOLDERURL } from "../util/constants";
import { CreatedRecipe, isCreatedRecipe } from "types/createdRecipe";
import { CreatedRecipeCard } from "./RecipeCard/CreatedRecipe";

type Props = {
  recipe: Hit<RecipeHit> | ImportedRecipe | Item | CreatedRecipe;
} & Omit<CardProps, "children">;

export const RecipeCard = ({ recipe, ...props }: Props) => {
  if (!recipe) {
    return (
      <Container>
        <LoadingOverlay visible />
      </Container>
    );
  }

  if (isCreatedRecipe(recipe)) return <CreatedRecipeCard recipe={recipe} {...props} />;

  if (isImportedRecipe(recipe)) {
    return (
      <Card {...props} shadow="sm">
        <Card.Section mb="sm">
          <Image
            objectFit="cover"
            layout="responsive"
            alt={recipe?.name}
            height={800}
            src={recipe.image}
            width={960}
          />
        </Card.Section>

        <CustomNextLink href={`/imported-recipe/${recipe?.id}`}>
          <Text weight="bold">{recipe?.name}</Text>
        </CustomNextLink>
      </Card>
    );
  }

  return (
    <Card shadow="md" {...props}>
      <Card.Section mb="sm">
        <RecipeCardImage
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
        recipe?.tags?.map((tag: Tag) => (
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
