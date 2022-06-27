/* eslint-disable react/jsx-no-bind */
import { useSession } from "@clerk/nextjs";
import { ArrowLeftIcon, DocumentIcon } from "@heroicons/react/outline";
import {
  Affix,
  Button,
  Card,
  Container,
  Divider,
  Group,
  Header,
  List,
  Text,
  Title,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { NextLink } from "@mantine/next";
import { GetServerSideProps } from "next";
import { NextSeo } from "next-seo";
import Image from "next/image";
import { useRouter } from "next/router";
import { Fragment, SyntheticEvent } from "react";
import { dehydrate, QueryClient } from "react-query";
import { AddToFavorites } from "../../components/Buttons/AddToFavorites";
import { IngredientCard } from "../../components/IngredientsCard";
import { NavbarContent } from "../../components/NavContent";
import { useAddGroceryMutation } from "../../hooks/useAddGroceryMutation";
import { useHellofreshBySlug } from "../../hooks/useHellofreshBySlug";
import { Grocery } from "../../types/grocery";
import {
  HF_ICON_IMAGE_URL,
  HF_OG_IMAGE_URL,
  HF_PLACEHOLDERURL,
  HF_STEP_IMAGE_URL,
} from "../../util/constants";
import { hellofreshSearchBySlug } from "../../util/hellofresh";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const queryClient = new QueryClient();
  const { recipe } = ctx.params;

  await queryClient.prefetchQuery(["hellofresh-by-slug", recipe], () =>
    hellofreshSearchBySlug({ slug: recipe as string }),
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

const Recipe = () => {
  const matches = useMediaQuery("(min-width: 900px)", true);
  const { session } = useSession();
  const router = useRouter();
  const { data: recipes } = useHellofreshBySlug(router.query.recipe as string);
  const recipe = recipes?.items[0];
  const { mutate: addGroceryMutation, isLoading } = useAddGroceryMutation();
  const yields = recipe?.yields?.map((y) => y.ingredients).flat();

  const addGroceriesIngredients = recipe?.ingredients?.map((ingredient) => {
    const ingredientYield = yields.filter((y) => y.id === ingredient.id);
    return {
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
            id: recipe.id,
            imagePath: recipe.imagePath,
            name: recipe.name,
            userId: session?.user?.id,
            slug: recipe.slug,
            uuid: recipe.id,
          },
          where: { uuid: recipe.id },
        },
      },
    } as Grocery;
  });

  const handleAddAllIngredients = (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    addGroceriesIngredients.map((addg) => {
      addGroceryMutation(addg);
    });
  };

  return (
    <>
      <NextSeo
        openGraph={{
          title: recipe?.name,
          description: recipe?.description,
          url: `${process.env.VERCEL_URL}${router.asPath}`,
          images: [
            {
              url: `${HF_OG_IMAGE_URL}${recipe?.imagePath}`,
              alt: recipe?.name,
              type: "image/jpeg",
            },
          ],
        }}
        title={recipe?.name}
        description={recipe?.description}
      />
      <Header height={70} mt={12}>
        <NavbarContent />
      </Header>
      <Affix position={{ bottom: 20, left: 20 }}>
        <Button leftIcon={<ArrowLeftIcon width={12} />} onClick={() => router.back()}>
          Go back
        </Button>
      </Affix>
      <div>
        <Image
          alt={recipe?.name}
          blurDataURL={`https://img.hellofresh.com/w_16,e_vectorize:5/hellofresh_s3${recipe?.imagePath}`}
          height={matches ? 700 : 350}
          objectFit="cover"
          placeholder="blur"
          src={`https://img.hellofresh.com/c_fill,f_auto,fl_lossy,h_500,q_auto,w_2400/hellofresh_s3${recipe?.imagePath}`}
          width={matches ? 2500 : 600}
        />

        <Container size="lg">
          <Card mt="md" mb="lg" p="lg" shadow="sm">
            <Card.Section p={20}>
              <Group position="apart">
                <Group direction="column" grow={false} spacing={0}>
                  <Title order={1}>{recipe?.name}</Title>
                  <Title order={6}> {recipe?.headline} </Title>
                </Group>
                <Group position={matches ? "right" : "center"}>
                  <AddToFavorites selectedRecipe={recipe} />
                  <NextLink href={`${recipe?.cardLink}`} target="_blank">
                    <Button leftIcon={<DocumentIcon width={16} />}>Print the Recipe Card</Button>
                  </NextLink>
                  <form onSubmit={handleAddAllIngredients}>
                    <Button loading={isLoading} type="submit">
                      Add all ingredients to groceries
                    </Button>
                  </form>
                </Group>
              </Group>
              <Divider my="sm" />
              <Group position="apart">
                <Group direction="column">
                  <Text sx={{ maxWidth: "750px" }}>{recipe?.description}</Text>
                  {recipe?.tags.length > 0 ? (
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
                <Group direction="column">
                  <Text>Total Time {recipe?.totalTime}</Text>
                  <Text>Difficulty {recipe?.difficulty}</Text>
                </Group>
              </Group>
            </Card.Section>
          </Card>

          <IngredientCard recipe={recipe} />

          <Card mt="xs" shadow="sm" withBorder>
            <Group>
              <Title order={2}>Instructions</Title>
              <List listStyleType="none" size="xl">
                {recipe?.steps?.map((step) => (
                  <Fragment key={step.index}>
                    <Group mb={24}>
                      {step.images.map((image) => (
                        <Image
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
            </Group>
          </Card>
        </Container>
      </div>
    </>
  );
};

export default Recipe;
