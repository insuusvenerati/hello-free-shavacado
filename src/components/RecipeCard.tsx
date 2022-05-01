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
      <Card.Section>
        <Image
          alt={recipe.name}
          height={340}
          src={`https://img.hellofresh.com/hellofresh_s3${recipe?.imagePath}`}
          width={600}
        />
      </Card.Section>

      <Text weight="bold">{recipe?.name}</Text>

      {recipe.tags.length > 0 && (
        <>
          {recipe.tags.map((tag) => (
            <Badge key={tag.id} size="xs">
              {tag.name}
            </Badge>
          ))}
        </>
      )}
    </Card>
  );
};
