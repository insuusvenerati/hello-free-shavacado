import { ArrowLeftIcon, DocumentIcon } from "@heroicons/react/24/outline";
import {
  Affix,
  Box,
  Button,
  Container,
  Divider,
  Group,
  List,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { Fragment } from "react";
import Image from "remix-image";
import type { Item } from "~/types/recipes";
import { HF_COVER_IMAGE_URL, HF_ICON_IMAGE_URL, HF_STEP_IMAGE_URL } from "~/util/constants";
import { getRecipeById } from "~/util/getRecipeById";

export const loader: LoaderFunction = async ({ params }) => {
  const recipe = await getRecipeById(params.id);
  return json({ recipe });
};

const RecipePage = () => {
  const matches = useMediaQuery("(min-width: 900px)", true);
  const { recipe } = useLoaderData<{ recipe: Item }>();
  // const { userId } = useAuth();
  // const { user } = useClerk();
  // const router = useRouter();
  // const { mutate: addGroceryMutation, isLoading } = useAddGroceryMutation();

  // const yields = recipe.yields?.map((y) => y.ingredients).flat();

  // const addGroceriesIngredients = recipe.ingredients?.map((ingredient) => {
  //   const ingredientYield = yields?.filter((y) => y.id === ingredient.id);
  //   return {
  //     grocery: {
  //       ingredient: ingredient.name,
  //       amount: ingredientYield[0].amount,
  //       unit: ingredientYield[0].unit,
  //       imagePath: ingredient.imagePath,
  //       family: ingredient.family.name,
  //       slug: ingredient.slug,
  //       uuid: ingredient.id,
  //     },
  //     recipe: {
  //       name: recipe.name,
  //       slug: recipe.slug,
  //       uuid: recipe.id,
  //       imagePath: recipe.imagePath,
  //     },
  //     user: {
  //       id: userId,
  //       name: user?.fullName,
  //       username: user?.username,
  //     },
  //   };
  // });

  // const handleAddAllIngredients = () => {
  //   addGroceriesIngredients?.map((addg) => {
  //     addGroceryMutation(addg);
  //   });
  // };

  return (
    <>
      {/* <RecipeJsonLd {...jsonLdData} /> */}
      <Affix position={{ bottom: 20, left: 20 }}>
        <Button leftIcon={<ArrowLeftIcon width={12} />} onClick={() => router.back()}>
          Go back
        </Button>
      </Affix>

      <Image
        alt={recipe.name}
        height={800}
        src={`${HF_COVER_IMAGE_URL}${recipe.imagePath}`}
        width={2400}
        style={{ objectFit: "cover", width: "100%", height: "auto" }}
      />

      <Container size="xl">
        <Box mt="md" mb="lg">
          <Group position="apart">
            <Stack>
              <Title order={1}>{recipe.name}</Title>
              <Title order={6}> {recipe.headline} </Title>
            </Stack>
            <Group position={matches ? "right" : "left"}>
              {/* <AddToFavorites selectedRecipe={recipe} /> */}
              {recipe.cardLink && (
                <Link to={recipe.cardLink} target="_blank">
                  <Button leftIcon={<DocumentIcon width={16} />}>Print the Recipe Card</Button>
                </Link>
              )}

              {/* <Button onClick={handleAddAllIngredients} loading={isLoading}>
                Add all ingredients to groceries
              </Button> */}

              {/* <ShareButton image={`${HF_CARD_IMAGE_URL}${recipe.imagePath}`} /> */}
            </Group>
          </Group>
          <Divider my="sm" />
          <Group position="apart">
            <Group>
              <Text sx={{ maxWidth: "750px" }}>{recipe.description}</Text>
              {recipe && recipe.tags.length > 0 ? (
                <Group>
                  <Text weight="bolder">Tags:</Text>
                  {recipe.tags.map((tag) => (
                    <Text key={tag.id}>{tag.name}</Text>
                  ))}
                </Group>
              ) : null}
              <Group>
                <Text weight="bolder">Allergens:</Text>
                {recipe.allergens.map((allergen) => (
                  <Group key={allergen.id}>
                    <Image
                      alt={allergen.id}
                      height={32}
                      src={`${HF_ICON_IMAGE_URL}/${allergen.iconPath}`}
                      width={32}
                    />
                    <Text>{allergen.name}</Text>
                  </Group>
                ))}
              </Group>
            </Group>
            <Group>
              <Text>Total Time {recipe.totalTime}</Text>
              <Text>Difficulty {recipe.difficulty}</Text>
            </Group>
          </Group>
        </Box>

        <Title mt="xl" order={2}>
          Ingredients
        </Title>
        {/* <IngredientCard recipe={recipe} /> */}

        <Box mt="xl">
          <Title order={2}>Instructions</Title>
          <List listStyleType="none" size="xl">
            {recipe.steps?.map((step) => (
              <Fragment key={step.index}>
                <Group mb={24}>
                  {step.images.map((image) => (
                    <Image
                      alt={image.caption}
                      height={230}
                      key={image.path}
                      src={`${HF_STEP_IMAGE_URL}/${image.path}`}
                      width={340}
                    />
                  ))}
                  <List.Item sx={{ maxWidth: 600 }}>{step?.instructions}</List.Item>
                </Group>
                <Divider my="sm" />
              </Fragment>
            ))}
          </List>
        </Box>
      </Container>
    </>
  );
};

export default RecipePage;
