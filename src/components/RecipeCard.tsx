import { Badge, Card, Text } from "@mantine/core";
import Image from "next/image";
import { useCallback } from "react";
import { useQuery } from "react-query";
import { Item } from "../types/recipes";
import { getPlaceholder } from "../util/getPlaceholder";

type Props = {
  recipe: Item;
  handler: () => void;
  setSelectedRecipe: (recipe: Item) => void;
};

export const RecipeCard = ({ recipe, handler, setSelectedRecipe }: Props) => {
  const { data: placeholder } = useQuery(["placeholder", recipe?.imageLink], () => getPlaceholder(recipe), {
    staleTime: 86000,
  });

  const selectedRecipeHandler = useCallback(() => {
    setSelectedRecipe(recipe);
  }, [setSelectedRecipe, recipe]);

  return (
    <Card onClick={handler} onMouseEnter={selectedRecipeHandler} shadow="sm">
      {/** TODO Could be better. Style props bad */}
      <Card.Section sx={{ width: 456.25, height: 258.5, marginBottom: 5 }}>
        {placeholder && (
          <Image
            alt={recipe.name}
            blurDataURL={placeholder}
            height={340}
            placeholder="blur"
            src={`https://img.hellofresh.com/hellofresh_s3${recipe?.imagePath}`}
            width={600}
          />
        )}
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
