import { Card, CardProps, Text } from "@mantine/core";
import { CustomNextLink } from "components/CustomNextLink";
import Image from "next/image";
import type { ImportedRecipe } from "types/importedRecipe";

type Props = {
  recipe: ImportedRecipe;
} & Omit<CardProps, "children">;

export const ImportedRecipeCard: React.FC<Props> = ({ recipe, ...props }) => {
  return (
    <Card {...props} shadow="sm">
      <Card.Section mb="sm">
        <Image
          objectFit="cover"
          layout="responsive"
          alt={recipe?.name}
          height={800}
          src={recipe.image}
          width={960}
        />
      </Card.Section>

      <CustomNextLink href={`/imported-recipe/${recipe?.id}`}>
        <Text weight="bold">{recipe?.name}</Text>
      </CustomNextLink>
    </Card>
  );
};
