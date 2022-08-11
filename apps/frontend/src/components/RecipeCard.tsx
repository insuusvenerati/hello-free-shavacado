import { Badge, Card, Container, LoadingOverlay, MantineShadow, Text } from "@mantine/core";
import { NextLink } from "@mantine/next";
import Image from "next/image";
import { Dispatch, SetStateAction, useState } from "react";
import { Item } from "../types/recipes";
import { AddToFavorites } from "./Buttons/AddToFavorites";

type Props = {
  recipe: Item | undefined;
  handler: () => void;
  setSelectedRecipe: Dispatch<SetStateAction<Item>>;
};

export const RecipeCard = ({ recipe, handler, setSelectedRecipe }: Props) => {
  const [shadow, setShadow] = useState<MantineShadow>("sm");

  if (!recipe) {
    return (
      <Container>
        <LoadingOverlay visible />
      </Container>
    );
  }

  const onMouseEnterHandler = () => {
    setShadow("md");
    setSelectedRecipe(recipe);
  };

  const onMouseLeaveHandler = () => {
    setShadow("sm");
  };

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
