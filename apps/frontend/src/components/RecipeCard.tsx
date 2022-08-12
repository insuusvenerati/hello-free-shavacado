import { Badge, Container, LoadingOverlay, Text } from "@mantine/core";
import { NextLink } from "@mantine/next";
import Image from "next/image";
import { RecipeHit } from "types/recipeSearchQuery";
import { AddToFavorites } from "./Buttons/AddToFavorites";

type Props = {
  recipe: RecipeHit | undefined;
};

export const RecipeCard = ({ recipe }: Props) => {
  if (!recipe) {
    return (
      <Container>
        <LoadingOverlay visible />
      </Container>
    );
  }

  return (
    <>
      <Image
        alt={recipe?.name}
        blurDataURL={`https://img.hellofresh.com/w_16,e_vectorize:5/hellofresh_s3${recipe?.imagePath}`}
        height={340}
        placeholder="blur"
        src={`https://img.hellofresh.com/c_fill,f_auto,fl_lossy,h_340,q_auto,w_600/hellofresh_s3${recipe?.imagePath}`}
        width={600}
        layout="responsive"
        style={{ marginBottom: 5 }}
      />

      <NextLink href={`/recipe/${recipe?.slug}`}>
        <Text weight="bold">{recipe?.name}</Text>
      </NextLink>

      {recipe?.tags?.length > 0 &&
        recipe?.tags?.map((tag) => (
          <Badge key={`${recipe?.id}-${tag?.id}-${Math.random()}`} size="xs">
            {tag.name}
          </Badge>
        ))}
      <AddToFavorites
        fullWidth
        selectedRecipe={recipe}
        sx={{ marginTop: "14px" }}
        variant="light"
      />
    </>
  );
};
