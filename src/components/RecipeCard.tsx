import { Badge, Card, MantineShadow, Text } from "@mantine/core";
import { NextLink } from "@mantine/next";
import Image from "next/image";
import { useCallback, useState } from "react";
import { Item } from "../types/recipes";
import { AddToFavorites } from "./Buttons/AddToFavorites";

type Props = {
  recipe: Item;
  handler: () => void;
  setSelectedRecipe: (recipe: Item) => void;
};

export const RecipeCard = ({ recipe, handler, setSelectedRecipe }: Props) => {
  const [shadow, setShadow] = useState<MantineShadow>("sm");

  const onMouseEnterHandler = useCallback(() => {
    setShadow("md");
    setSelectedRecipe(recipe);
  }, [setSelectedRecipe, recipe]);

  const onMouseLeaveHandler = useCallback(() => {
    setShadow("sm");
  }, []);

  return (
    <Card onMouseEnter={onMouseEnterHandler} onMouseLeave={onMouseLeaveHandler} shadow={shadow}>
      <Card.Section onClick={handler} sx={{ width: 456.25, height: 258.5, marginBottom: 5, cursor: "pointer" }}>
        <Image
          alt={recipe.name}
          blurDataURL={`https://img.hellofresh.com/w_16,e_vectorize:5/hellofresh_s3${recipe?.imagePath}`}
          height={340}
          placeholder="blur"
          src={`https://img.hellofresh.com/c_fill,f_auto,fl_lossy,h_340,q_auto,w_600/hellofresh_s3${recipe?.imagePath}`}
          width={600}
        />
      </Card.Section>

      <NextLink href={`/recipe/${recipe?.slug}`}>
        <Text weight="bold">{recipe?.name}</Text>
      </NextLink>

      {recipe?.tags?.length > 0 &&
        recipe?.tags?.map((tag) => (
          <Badge key={`${recipe?.id}-${tag?.id}-${Math.random()}`} size="xs">
            {tag.name}
          </Badge>
        ))}
      <AddToFavorites fullWidth selectedRecipe={recipe} sx={{ marginTop: "14px" }} variant="light" />
    </Card>
  );
};
