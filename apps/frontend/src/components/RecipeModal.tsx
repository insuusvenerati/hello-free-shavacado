/* eslint-disable react/jsx-no-bind */
import { CheckCircleIcon, DocumentIcon } from "@heroicons/react/24/outline";
import { Badge, Button, Card, Group, List, Modal, Text, ThemeIcon } from "@mantine/core";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useCallback } from "react";
import { Item } from "../types/recipes";
import { AddToFavorites } from "./Buttons/AddToFavorites";
import { CustomNextLink } from "./CustomNextLink";
import { IngredientCard } from "./IngredientsCard";

type Props = {
  recipe: Item | undefined;
  opened: boolean;
  onClose: () => void;
};

const RecipeModal = ({ recipe, opened, onClose }: Props) => {
  const removeSymbols = useCallback((text: string) => {
    return text.replace(/[^a-zA-Z.\n ]/g, "");
  }, []);

  if (!recipe) return null;

  return (
    <Modal
      centered
      onClose={onClose}
      opened={opened}
      overflow="inside"
      padding="xs"
      size="1200"
      title={recipe?.name}
    >
      <Image
        alt={recipe?.name}
        blurDataURL={`https://img.hellofresh.com/w_8,e_vectorize:5/hellofresh_s3${recipe?.imagePath}`}
        height={800}
        objectFit="cover"
        placeholder="blur"
        src={`https://img.hellofresh.com/c_fill,f_auto,fl_lossy,h_768,q_auto,w_1152/hellofresh_s3${recipe?.imagePath}`}
        width={2400}
      />

      <Card mt="xs" p="sm" shadow="sm" withBorder>
        <Group position="center">
          {recipe?.allergens?.map((allergen) => (
            <Badge key={allergen.id} size="xl" sx={{ marginRight: "$3" }}>
              {allergen.name}
            </Badge>
          ))}
          <Text>{recipe?.descriptionMarkdown}</Text>
          <AddToFavorites selectedRecipe={recipe} />
          {recipe.cardLink && (
            <CustomNextLink href={`${recipe?.cardLink}`} target="_blank">
              <Button leftIcon={<DocumentIcon width={16} />}>Print the Recipe Card</Button>
            </CustomNextLink>
          )}
        </Group>
      </Card>

      <IngredientCard recipe={recipe} />

      <Card mt="xs" shadow="sm" withBorder>
        <Group>
          <Text size="xl" weight="bold">
            Instructions
          </Text>
          <List
            center
            icon={
              <ThemeIcon color="teal" radius="xl" size={24}>
                <CheckCircleIcon height={16} width={16} />
              </ThemeIcon>
            }
            size="xl"
            spacing="xl"
          >
            {recipe?.steps?.map((step) => (
              <List.Item key={step.index + Math.random()}>
                {removeSymbols(step?.instructionsMarkdown)}
              </List.Item>
            ))}
          </List>
        </Group>
      </Card>
    </Modal>
  );
};

export default RecipeModal;
export const LazyRecipeModal = dynamic(() => import("../components/RecipeModal"));
