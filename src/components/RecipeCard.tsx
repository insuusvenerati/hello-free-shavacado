import { Badge, Card, Text } from "@mantine/core";
import Image from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Item } from "../types/recipes";
import { getPlaceholder } from "../util/getPlaceholder";

type Props = {
  recipe: Item;
  handler: () => void;
  setSelectedRecipe: (recipe: Item) => void;
};

export const RecipeCard = ({ recipe, handler, setSelectedRecipe }: Props) => {
  const selectedRecipeHandler = useCallback(() => {
    setSelectedRecipe(recipe);
  }, [setSelectedRecipe, recipe]);
  const [placeholder, setPlaceholder] = useState("");

  useEffect(() => {
    getPlaceholder(
      `https://img.hellofresh.com/hellofresh_s3${recipe?.imagePath}`,
    )
      .then((value) => setPlaceholder(value.base64))
      .catch((err) => console.log(err));
  }, [recipe?.imagePath]);

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
