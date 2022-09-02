import { Badge, Card, Container, LoadingOverlay, Text } from "@mantine/core";
import { Hit } from "instantsearch.js";
import Image from "next/future/image";
import { ImportedRecipe, isImportedRecipe } from "types/importedRecipe";
import { Item, Tag } from "types/recipes";
import { RecipeHit } from "types/recipeSearchQuery";
import { AddToFavorites } from "./Buttons/AddToFavorites";
import { CustomNextLink } from "./CustomNextLink";
import { RecipeCardImage } from "./RecipeCardImage";

type Props = {
  recipe: Hit<RecipeHit> | ImportedRecipe | Item;
};

const imageCSS = { width: "100%", height: "auto" };

export const RecipeCard = ({ recipe }: Props) => {
  if (!recipe) {
    return (
      <Container>
        <LoadingOverlay visible />
      </Container>
    );
  }

  if (isImportedRecipe(recipe)) {
    return (
      <Card shadow="sm">
        <Card.Section mb="sm">
          <Image
            style={imageCSS}
            sizes="100vw"
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
    <Card shadow="sm">
      <Card.Section mb="sm">
        <RecipeCardImage alt={recipe?.name} height={340} src={recipe?.imagePath} width={600} />
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
