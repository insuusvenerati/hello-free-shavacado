import { Badge, Card, CardProps } from "@mantine/core";
import Image from "next/image";
import { CreatedRecipe } from "types/createdRecipe";

type Props = {
  recipe: CreatedRecipe;
} & Omit<CardProps, "children">;

export const CreatedRecipeCard = ({ recipe, ...props }: Props) => {
  return (
    <Card {...props} shadow="sm">
      <Card.Section mb="sm">
        <Image
          objectFit="cover"
          layout="responsive"
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
