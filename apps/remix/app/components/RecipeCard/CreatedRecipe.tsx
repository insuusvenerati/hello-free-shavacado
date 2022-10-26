import type { CardProps } from "@mantine/core";
import { Badge, Card, Image } from "@mantine/core";
import type { CreatedRecipe } from "@prisma/client";

type Props = {
  recipe: CreatedRecipe;
} & Omit<CardProps, "children">;

export const CreatedRecipeCard = ({ recipe, ...props }: Props) => {
  return (
    <Card {...props} shadow="sm">
      <Card.Section mb="sm">
        <Image
          style={{ objectFit: "cover" }}
          alt={recipe.name}
          height={800}
          src={recipe.image}
          width={960}
        />
      </Card.Section>

      {recipe.tags.length > 0 &&
        recipe.tags.map((tag) => <Badge key={`${recipe.id}-${tag}`}>{tag}</Badge>)}

      {/* <CustomNextLink href={`/imported-recipe/${recipe?.id}`}>
          <Text weight="bold">{recipe?.name}</Text>
        </CustomNextLink> */}
    </Card>
  );
};
