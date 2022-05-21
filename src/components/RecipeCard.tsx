import { Badge, Card, Text } from "@mantine/core";
import Image from "next/image";
import { useCallback } from "react";
import { Item } from "../types/recipes";

type Props = {
  recipe: Item;
  handler: () => void;
  setSelectedRecipe: (recipe: Item) => void;
};

export const RecipeCard = ({ recipe, handler, setSelectedRecipe }: Props) => {
  const selectedRecipeHandler = useCallback(() => {
    setSelectedRecipe(recipe);
  }, [setSelectedRecipe, recipe]);

  return (
    <Card onClick={handler} onMouseEnter={selectedRecipeHandler} shadow="sm">
      {/** TODO Could be better. Style props bad */}
      <Card.Section sx={{ width: 456.25, height: 258.5, marginBottom: 5 }}>
        <Image
          alt={recipe.name}
          blurDataURL={`https://img.hellofresh.com/w_100,e_vectorize:5/hellofresh_s3${recipe?.imagePath}`}
          height={340}
          placeholder="blur"
          src={`https://img.hellofresh.com/c_fill,f_auto,fl_lossy,h_768,q_auto,w_1152/hellofresh_s3${recipe?.imagePath}`}
          width={600}
        />
      </Card.Section>

      <Text weight="bold">{recipe?.name}</Text>

      {recipe.tags.length > 0 &&
        recipe.tags.map((tag) => (
          <Badge key={`${recipe?.id}-${tag?.id}-${Math.random()}`} size="xs">
            {tag.name}
          </Badge>
        ))}
    </Card>
  );
};
