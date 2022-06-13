/* eslint-disable react/jsx-no-bind */
import { useSession } from "@clerk/nextjs";
import { CheckIcon, PlusIcon } from "@heroicons/react/outline";
import { Card, Accordion, SimpleGrid, Group, ActionIcon, Text } from "@mantine/core";
import Image from "next/image";
import { useAddGroceryMutation } from "../hooks/useAddGroceryMutation";
import { useGetGroceriesQuery } from "../hooks/useGetGroceriesQuery";
import { Item } from "../types/recipes";
import { HF_AVATAR_IMAGE_URL } from "../util/constants";

export const IngredientCard = ({ recipe }: { recipe: Item }) => {
  const { mutate: addGroceryMutation, isLoading } = useAddGroceryMutation();
  const { session } = useSession();
  const { data: groceries } = useGetGroceriesQuery();

  const isGroceryAdded = (id: string) => groceries?.some((g) => g.uuid === id);
  const yields = recipe?.yields?.map((y) => y.ingredients).flat();

  return (
    <Card p="lg" shadow="sm">
      <Accordion offsetIcon={false}>
        <Accordion.Item
          label={
            <Text size="lg" weight="bold">
              Ingredients
            </Text>
          }
        >
          <SimpleGrid
            breakpoints={[
              { minWidth: "sm", cols: 1 },
              { minWidth: "lg", cols: 2 },
            ]}
          >
            {recipe?.ingredients.map((ingredient) => {
              const ingredientYield = yields.filter((y) => y.id === ingredient.id);
              return (
                <Group key={ingredient.id}>
                  <form
                    onSubmit={(event) => {
                      event.preventDefault();
                      addGroceryMutation({
                        ingredient: ingredient.name,
                        amount: ingredientYield[0].amount,
                        unit: ingredientYield[0].unit,
                        imagePath: ingredient.imagePath,
                        userId: session?.user?.id,
                        slug: ingredient.slug,
                        family: ingredient.family.name,
                        uuid: ingredient.id,
                        recipe: {
                          connectOrCreate: {
                            create: {
                              imagePath: recipe.imagePath,
                              name: recipe.name,
                              userId: session?.user?.id,
                              slug: recipe.slug,
                              uuid: recipe.id,
                            },
                            where: { uuid: recipe.id },
                          },
                        },
                      });
                    }}
                  >
                    <ActionIcon
                      loading={isLoading}
                      type="submit"
                      variant="light"
                      color="green"
                      disabled={isGroceryAdded(ingredient.id)}
                    >
                      {isGroceryAdded(ingredient.id) ? (
                        <CheckIcon width={16} />
                      ) : (
                        <PlusIcon width={16} />
                      )}
                    </ActionIcon>
                  </form>
                  <Image
                    alt={ingredient.description}
                    height={60}
                    src={`${HF_AVATAR_IMAGE_URL}/${ingredient.imagePath}`}
                    width={60}
                  />
                  <Group spacing={0} direction="column">
                    <Text>
                      {ingredientYield[0].amount} {ingredientYield[0].unit}
                    </Text>
                    <Text>{ingredient.name}</Text>
                  </Group>
                </Group>
              );
            })}
          </SimpleGrid>
        </Accordion.Item>
      </Accordion>
    </Card>
  );
};
