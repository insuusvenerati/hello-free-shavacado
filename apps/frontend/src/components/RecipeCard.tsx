import { Badge, Card, Container, LoadingOverlay, Text } from "@mantine/core";
import { Hit } from "instantsearch.js";
import Image from "next/image";
import { ImportedRecipe, isImportedRecipe } from "types/importedRecipe";
import { RecipeHit } from "types/recipeSearchQuery";
import { AddToFavorites } from "./Buttons/AddToFavorites";
import { CustomNextLink } from "./CustomNextLink";

type Props = {
  recipe: Hit<RecipeHit> | ImportedRecipe;
};

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
            alt={recipe?.name}
            height={800}
            src={recipe.image}
            width={960}
            layout="responsive"
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
        <Image
          alt={recipe?.name}
          blurDataURL={`https://img.hellofresh.com/w_16,e_vectorize:5/hellofresh_s3${recipe?.imagePath}`}
          height={340}
          placeholder="blur"
          src={`https://img.hellofresh.com/c_fill,f_auto,fl_lossy,h_340,q_auto,w_600/hellofresh_s3${recipe?.imagePath}`}
          width={600}
          layout="responsive"
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
