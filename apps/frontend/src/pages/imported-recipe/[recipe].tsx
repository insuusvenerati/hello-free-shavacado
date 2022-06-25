import { withServerSideAuth } from "@clerk/nextjs/ssr";
import { DocumentIcon } from "@heroicons/react/outline";
import {
  Button,
  Card,
  Container,
  Divider,
  Group,
  Header,
  List,
  LoadingOverlay,
  Text,
  Title,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { NextLink } from "@mantine/next";
import { GetServerSideProps } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { Fragment } from "react";
import { dehydrate, QueryClient } from "react-query";
import { AddToFavorites } from "../../components/Buttons/AddToFavorites";
import { IngredientCard } from "../../components/IngredientsCard";
import { NavbarContent } from "../../components/NavContent";
import { useGetOneImportedRecipeQuery } from "../../hooks/useGetImportedRecipesQuery";
import { HF_ICON_IMAGE_URL, HF_PLACEHOLDERURL, HF_STEP_IMAGE_URL } from "../../util/constants";

export const getServerSideProps: GetServerSideProps = withServerSideAuth(
  async ({ req, params }) => {
    const { userId } = req.auth;
    const { recipe } = params;
    const queryClient = new QueryClient();
    await queryClient.prefetchQuery(["importedRecipe", userId, recipe]);
    console.log(recipe);
    return {
      props: { dehydratedState: dehydrate(queryClient) },
    };
  },
);

const ImportedRecipe = () => {
  const matches = useMediaQuery("(min-width: 900px)", true);
  const { query } = useRouter();
  const { data: recipe, isLoading } = useGetOneImportedRecipeQuery({ id: query.recipe as string });
  console.log(query.recipe);

  if (isLoading) return <LoadingOverlay visible />;

  return (
    <>
      <Head>
        <meta property="og:image" content={recipe?.image} />
        <meta property="og:description" content={recipe?.description} />
        <title> {recipe?.name} </title>
      </Head>
      <Header height={70} mt={12}>
        <NavbarContent />
      </Header>
      <Image
        alt={recipe?.name}
        height={matches ? 700 : 350}
        objectFit="cover"
        src={recipe?.image}
        width={matches ? 2500 : 600}
      />
      <Container size="lg">
        <Card mt="md" mb="lg" p="lg" shadow="sm">
          <Card.Section p={20}>
            <Group position="apart">
              <Group direction="column" grow={false} spacing={0}>
                <Title order={1}>{recipe.name}</Title>
                <Title order={6}> {recipe.description} </Title>
              </Group>
              <Group position={matches ? "right" : "center"}>
                {/* <AddToFavorites selectedRecipe={recipe} /> */}
                {/* <form onSubmit={handleAddAllIngredients}>
                    <Button loading={isLoading} type="submit">
                      Add all ingredients to groceries
                    </Button>
                  </form> */}
              </Group>
            </Group>
            <Divider my="sm" />
            <Group position="apart">
              <Group direction="column">
                <Text sx={{ maxWidth: "750px" }}>{recipe?.description}</Text>
                {recipe?.keywords.length > 0 ? (
                  <Group>
                    <Text weight="bolder">Tags:</Text>
                    {recipe?.keywords.map((tag) => (
                      <Text key={tag}>{tag}</Text>
                    ))}
                  </Group>
                ) : null}
                <Group>
                  {/* <Text weight="bolder">Allergens:</Text>
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
                    ))} */}
                </Group>
              </Group>
              <Group direction="column">
                <Text>Total Time {recipe?.totalTime}</Text>
                {/* <Text>Difficulty {recipe?.difficulty}</Text> */}
              </Group>
            </Group>
          </Card.Section>
        </Card>

        <Card mt="xs" shadow="sm" withBorder>
          <Title order={2}>Ingredients</Title>

          <List listStyleType="none">
            {recipe.recipeIngredients.map((ingredient) => (
              <List.Item key={ingredient}>
                <Text>{ingredient}</Text>
              </List.Item>
            ))}
          </List>
        </Card>
        {/* <IngredientCard recipe={recipe} /> */}

        <Card mt="xs" shadow="sm" withBorder>
          <Title order={2}>Instructions</Title>
          <Group>
            <List listStyleType="none" size="xl">
              {recipe?.recipeInstructions?.map((step) => (
                <Fragment key={step}>
                  <Group mb={24}>
                    <List.Item sx={{ maxWidth: 600 }}>{step}</List.Item>
                  </Group>
                  <Divider my="sm" />
                </Fragment>
              ))}
            </List>
          </Group>
        </Card>
      </Container>
    </>
  );
};

export default ImportedRecipe;
