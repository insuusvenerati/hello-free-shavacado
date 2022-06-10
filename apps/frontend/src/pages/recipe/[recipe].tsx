/* eslint-disable react/jsx-no-bind */
import { useSession } from "@clerk/nextjs";
import { ArrowLeftIcon, CheckIcon, DocumentIcon, PlusIcon } from "@heroicons/react/outline";
import {
  Accordion,
  ActionIcon,
  Affix,
  Button,
  Card,
  Container,
  Divider,
  Group,
  Header,
  List,
  SimpleGrid,
  Space,
  Text,
  Title,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { NextLink } from "@mantine/next";
import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { Fragment } from "react";
import { AddToFavorites } from "../../components/Buttons/AddToFavorites";
import { NavbarContent } from "../../components/NavContent";
import { useAddGroceryMutation } from "../../hooks/useAddGroceryMutation";
import { useGetGroceriesQuery } from "../../hooks/useGetGroceriesQuery";
import { Item, RecipeQuery } from "../../types/recipes";
import {
  HELLOFRESH_SEARCH_URL,
  HF_AVATAR_IMAGE_URL,
  HF_ICON_IMAGE_URL,
  HF_OG_IMAGE_URL,
  HF_PLACEHOLDERURL,
  HF_STEP_IMAGE_URL,
} from "../../util/constants";
import { hellofreshSearchBySlug } from "../../util/hellofresh";

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await fetch(`${HELLOFRESH_SEARCH_URL}/favorites`);
  const data: Item[] = await response.json();

  const paths = data?.map((recipe) => ({
    params: { recipe: recipe.slug },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { recipe } = ctx.params;
  const data = await hellofreshSearchBySlug({ slug: recipe as string });

  return { props: { data } };
};

const Recipe = ({ data: recipes }: { data: RecipeQuery }) => {
  const matches = useMediaQuery("(min-width: 900px)", true);
  const { session } = useSession();
  const router = useRouter();
  const recipe = recipes?.items[0];
  const { mutate: addGrocery, isLoading } = useAddGroceryMutation();
  const { data: groceries } = useGetGroceriesQuery();
  const isGroceryAdded = (id: string) => groceries?.some((g) => g.uuid === id);
  const yields = recipe.yields.map((y) => y.ingredients).flat();

  return (
    <>
      <Head>
        <meta property="og:image" content={`${HF_OG_IMAGE_URL}${recipe.imagePath}`} />
        <meta property="og:description" content={recipe.description} />
        <title> {recipe.name} </title>
      </Head>
      <Header height={70} mt={12}>
        <NavbarContent />
      </Header>
      <Affix position={{ bottom: 20, left: 20 }}>
        <Button leftIcon={<ArrowLeftIcon width={12} />} onClick={() => router.back()}>
          Go back
        </Button>
      </Affix>
      <div style={{ backgroundColor: "#FDFCFA" }}>
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
          <Card mt="md" p="lg" shadow="sm">
            <Card.Section p={20}>
              <Group position="apart">
                <Group direction="column" grow={false} spacing={0}>
                  <Title order={1}>{recipe.name}</Title>
                  <Title order={6}> {recipe.headline} </Title>
                </Group>
                <Group position={matches ? "right" : "center"}>
                  <AddToFavorites selectedRecipe={recipe} />
                  <NextLink href={`${recipe?.cardLink}`} target="_blank">
                    <Button leftIcon={<DocumentIcon width={16} />}>Print the Recipe Card</Button>
                  </NextLink>
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
          <Space h="lg" />
          <Card p="lg" shadow="sm">
            <Accordion offsetIcon={false}>
              <Accordion.Item
                label={
                  <Text size="lg" weight="bold">
                    Ingredients
                  </Text>
                }
              >
                <SimpleGrid cols={2}>
                  {recipe?.ingredients.map((ingredient) => {
                    const ingredientYield = yields.filter((y) => y.id === ingredient.id);
                    return (
                      <Group key={ingredient.id} p="xs">
                        <form
                          onSubmit={(event) => {
                            event.preventDefault();
                            addGrocery({
                              ingredient: ingredient.name,
                              amount: ingredientYield[0].amount,
                              unit: ingredientYield[0].unit,
                              imagePath: ingredient.imagePath,
                              userId: session?.user?.id,
                              slug: ingredient.slug,
                              family: ingredient.family.name,
                              uuid: ingredient.id,
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
                        <Text>
                          {ingredientYield[0].amount} {ingredientYield[0].unit}
                        </Text>
                        <Text>{ingredient.name}</Text>
                      </Group>
                    );
                  })}
                </SimpleGrid>
              </Accordion.Item>
              <Accordion.Item
                label={
                  <Text size="lg" weight="bold">
                    Instructions
                  </Text>
                }
              >
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
              </Accordion.Item>
            </Accordion>
          </Card>
          {/* <Card mt="xs" shadow="sm" withBorder>
            <Accordion offsetIcon={false}>
              <Accordion.Item
                label={
                  <Text size="lg" weight="bold">
                    Instructions
                  </Text>
                }
              >
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
              </Accordion.Item>
            </Accordion>
          </Card> */}
        </Container>
      </div>
    </>
  );
};

export default Recipe;
