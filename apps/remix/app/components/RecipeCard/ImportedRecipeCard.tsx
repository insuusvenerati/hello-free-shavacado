import type { CardProps } from "@mantine/core";
import { Card, Image, Text } from "@mantine/core";
import { Link } from "@remix-run/react";
import type { ImportedRecipe } from "~/types/importedRecipe";

type Props = {
  recipe: ImportedRecipe;
} & Omit<CardProps, "children">;

export const ImportedRecipeCard: React.FC<Props> = ({ recipe, ...props }) => {
  return (
    <Card {...props} shadow="sm">
      <Card.Section mb="sm">
        <Image
          style={{ objectFit: "cover" }}
          alt={recipe?.name}
          height={800}
          src={recipe.image}
          width={960}
        />
      </Card.Section>

      <Link to={`/imported-recipe/${recipe?.id}`}>
        <Text weight="bold">{recipe?.name}</Text>
      </Link>
    </Card>
  );
};
