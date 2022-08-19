/* eslint-disable react/jsx-no-bind */
import { useAuth } from "@clerk/nextjs";
import { CustomNextLink } from "@components/CustomNextLink";
import { ArrowLeftIcon, DocumentIcon } from "@heroicons/react/outline";
import {
  Affix,
  Box,
  Button,
  Card,
  Container,
  Divider,
  Group,
  List,
  Loader,
  LoadingOverlay,
  Text,
  Title,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { GetStaticPaths, GetStaticProps } from "next";
import { NextSeo } from "next-seo";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useRouter } from "next/router";
import { Fragment, SyntheticEvent } from "react";
import { Item } from "types/recipes";
import { getPopularRecipes } from "util/getPopularRecipes";
import { getRecipeById } from "util/getRecipeById";
import { AddToFavorites } from "../../components/Buttons/AddToFavorites";
import { IngredientCard } from "../../components/IngredientsCard";
import { useAddGroceryMutation } from "../../hooks/useAddGroceryMutation";
import { AddGrocery } from "../../types/grocery";
import {
  getOgImageUrl,
  HF_COVER_IMAGE_URL,
  HF_ICON_IMAGE_URL,
  HF_PLACEHOLDERURL,
  HF_STEP_IMAGE_URL,
  VERCEL_URL,
} from "../../util/constants";

const LazyImage = dynamic(() => import("next/image"));

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const id = params?.id as string;
  const recipe = await getRecipeById({ id });

  return {
    props: { recipe },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const popularRecipes = await getPopularRecipes();
  const ids = popularRecipes.items.map((item) => item.id);
  const paths = ids.map((id) => ({ params: { id } }));

  return {
    paths: paths,
    fallback: "blocking",
  };
};

const Recipe = ({ recipe }: { recipe: Item }) => {
  const matches = useMediaQuery("(min-width: 900px)", true);
  const { userId } = useAuth();
  const router = useRouter();
  const { mutate: addGroceryMutation, isLoading } = useAddGroceryMutation();

  const yields = recipe?.yields?.map((y) => y.ingredients).flat();

  const addGroceriesIngredients = recipe?.ingredients?.map((ingredient) => {
    const ingredientYield = yields?.filter((y) => y.id === ingredient.id);
    return {
      ingredient: ingredient.name,
      amount: ingredientYield[0].amount,
      unit: ingredientYield[0].unit,
      imagePath: ingredient.imagePath,
      userId: userId,
      slug: ingredient.slug,
      family: ingredient.family.name,
      uuid: ingredient.id,
      recipe: {
        connectOrCreate: {
          create: {
            id: recipe.id,
            imagePath: recipe.imagePath,
            name: recipe.name,
            userId: userId,
            slug: recipe.slug,
            uuid: recipe.id,
          },
          where: { uuid: recipe.id },
        },
      },
    } as AddGrocery;
  });

  const handleAddAllIngredients = (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    addGroceriesIngredients?.map((addg) => {
      addGroceryMutation(addg);
    });
  };

  if (!recipe) return <LoadingOverlay visible />;

  return (
    <>
      <NextSeo
        openGraph={{
          title: recipe?.name,
          description: recipe?.description,
          url: `${VERCEL_URL}${router.asPath}`,
          images: [
            {
              url: getOgImageUrl(recipe?.imagePath),
              alt: recipe.name,
              type: "image/jpeg",
            },
          ],
        }}
        title={recipe?.name}
        description={recipe?.description}
      />

      <Affix position={{ bottom: 20, left: 20 }}>
        <Button leftIcon={<ArrowLeftIcon width={12} />} onClick={() => router.back()}>
          Go back
        </Button>
      </Affix>

      {recipe?.imagePath ? (
        <Image
          alt={recipe?.name}
          blurDataURL={`${HF_PLACEHOLDERURL}${recipe?.imagePath}`}
          height={matches ? 800 : 350}
          objectFit="cover"
          placeholder="blur"
          src={`${HF_COVER_IMAGE_URL}${recipe?.imagePath}`}
          width={matches ? 2400 : 600}
        />
      ) : (
        <Loader />
      )}

      <Container size="xl">
        <Box mt="md" mb="lg">
          <Card.Section p={20}>
            <Group position="apart">
              <Group grow={false} spacing={0}>
                <Title order={1}>{recipe?.name}</Title>
                <Title order={6}> {recipe?.headline} </Title>
              </Group>
              <Group position={matches ? "right" : "center"}>
                <AddToFavorites selectedRecipe={recipe} />
                {recipe?.cardLink && (
                  <CustomNextLink href={recipe?.cardLink} target="_blank">
                    <Button leftIcon={<DocumentIcon width={16} />}>Print the Recipe Card</Button>
                  </CustomNextLink>
                )}
                <form onSubmit={handleAddAllIngredients}>
                  <Button loading={isLoading} type="submit">
                    Add all ingredients to groceries
                  </Button>
                </form>
              </Group>
            </Group>
            <Divider my="sm" />
            <Group position="apart">
              <Group>
                <Text sx={{ maxWidth: "750px" }}>{recipe?.description}</Text>
                {recipe && recipe?.tags.length > 0 ? (
                  <Group>
                    <Text weight="bolder">Tags:</Text>
                    {recipe?.tags.map((tag) => (
                      <Text key={tag.id}>{tag.name}</Text>
                    ))}
                  </Group>
                ) : null}
                <Group>
                  <Text weight="bolder">Allergens:</Text>
                  {recipe?.allergens.map((allergen) => (
                    <Group key={allergen.id}>
                      <LazyImage
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
                <Text>Total Time {recipe?.totalTime}</Text>
                <Text>Difficulty {recipe?.difficulty}</Text>
              </Group>
            </Group>
          </Card.Section>
        </Box>

        <Title mt="xl" order={2}>
          Ingredients
        </Title>
        <IngredientCard recipe={recipe} />

        <Box mt="xl">
          {/* <Group> */}
          <Title order={2}>Instructions</Title>
          <List listStyleType="none" size="xl">
            {recipe?.steps?.map((step) => (
              <Fragment key={step.index}>
                <Group mb={24}>
                  {step.images.map((image) => (
                    <LazyImage
                      alt={image.caption}
                      blurDataURL={`${HF_PLACEHOLDERURL}/${image.path}`}
                      height={230}
                      key={image.path}
                      placeholder="blur"
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
          {/* </Group> */}
        </Box>
      </Container>
    </>
  );
};

export default Recipe;
