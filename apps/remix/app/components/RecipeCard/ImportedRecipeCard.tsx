import type { CardProps } from "@mantine/core";
import { Anchor } from "@mantine/core";
import { Card, Image, Text } from "@mantine/core";
import type { ImportedRecipe } from "@prisma/client";
import { Link } from "@remix-run/react";

type Props = {
  recipe: ImportedRecipe;
} & Omit<CardProps, "children">;

export const ImportedRecipeCard: React.FC<Props> = ({ recipe, ...props }) => {
  return (
    <Card {...props} shadow="sm">
      <Card.Section mb="sm">
        <Image
          style={{ objectFit: "cover" }}
          alt={recipe.name}
          height={340}
          src={recipe.image}
          width={600}
        />
      </Card.Section>

      <Anchor component={Link} to={`/imported-recipe/${recipe.id}`}>
        <Text weight="bold">{recipe.name}</Text>
      </Anchor>
    </Card>
  );
};
