import {
  Container,
  Divider,
  Group,
  Image,
  List,
  LoadingOverlay,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { NextSeo } from "next-seo";
// import Image from "next/future/image";
import { useRouter } from "next/router";
import { Fragment } from "react";
import { useGetOneImportedRecipeQuery } from "hooks/useGetImportedRecipesQuery";
import { HOST } from "../../util/constants";

// const imageCSS = { width: "100%", height: "auto" };

const ImportedRecipe = () => {
  const { query, asPath } = useRouter();
  const { data: recipe, isSuccess } = useGetOneImportedRecipeQuery({ id: query.recipe as string });

  if (!isSuccess) {
    return (
      <Container>
        <LoadingOverlay visible />
      </Container>
    );
  }

  return (
    <>
      <NextSeo
        openGraph={{
          title: recipe.name,
          description: recipe.description,
          url: `${HOST}${asPath}`,
          images: [
            {
              url: recipe.image,
              alt: recipe.name,
              type: "image/jpeg",
            },
          ],
        }}
        title={recipe.name}
        description={recipe.description}
      />
      <Image
        alt={recipe.name}
        height={600}
        src={recipe.image}
        width={2200}
        withPlaceholder
        style={{
          objectFit: "cover",
          width: "100%",
        }}
      />
      <Container size="lg">
        {/* <Card mt="md" mb="lg" p="lg" shadow="sm">
          <Card.Section p={20}> */}
        <Group mt="md" mb="lg" p="lg" position="apart">
          <Stack>
            <Title order={1}>{recipe.name}</Title>
            <Title order={6}> {recipe.description} </Title>
          </Stack>
        </Group>
        <Divider my="sm" />
        <Group position="apart">
          <Stack>
            {recipe && recipe.keywords?.length > 0 ? (
              <Group>
                <Text weight="bolder">Tags:</Text>
                {recipe.keywords.map((tag) => (
                  <Text key={tag}>{tag}</Text>
                ))}
              </Group>
            ) : null}
          </Stack>
          <Stack>
            <Text>Total Time {recipe.totalTime}</Text>
          </Stack>
        </Group>
        {/* </Card.Section>
        </Card> */}

        {/* <Card mt="xs" shadow="sm" withBorder> */}
        <Title mt="md" mb="md" order={2}>
          Ingredients
        </Title>

        <List listStyleType="none">
          {recipe.recipeIngredients.map((ingredient) => (
            <List.Item key={ingredient}>
              <Text>{ingredient}</Text>
            </List.Item>
          ))}
        </List>
        {/* </Card> */}
        {/* <IngredientCard recipe={recipe} /> */}

        {/* <Card mt="xs" shadow="sm" withBorder> */}
        <Title mt="md" mb="md" order={2}>
          Instructions
        </Title>
        <Group>
          <List type="ordered" size="xl">
            {recipe.recipeInstructions?.map((step) => (
              <Fragment key={step}>
                <Group mb={24}>
                  <List.Item sx={{ maxWidth: 600 }}>{step}</List.Item>
                </Group>
                <Divider my="sm" />
              </Fragment>
            ))}
          </List>
        </Group>
        {/* </Card> */}
      </Container>
    </>
  );
};

export default ImportedRecipe;
