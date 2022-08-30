import {
  Card,
  Container,
  Divider,
  Group,
  List,
  LoadingOverlay,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { NextSeo } from "next-seo";
import Image from "next/future/image";
import { useRouter } from "next/router";
import { Fragment } from "react";
import { useGetOneImportedRecipeQuery } from "../../hooks/useGetImportedRecipesQuery";
import { VERCEL_URL } from "../../util/constants";

const imageCSS = { width: "100%", height: "auto" };

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
          title: recipe?.name,
          description: recipe?.description,
          url: `${VERCEL_URL}${asPath}`,
          images: [
            {
              url: recipe?.image,
              alt: recipe?.name,
              type: "image/jpeg",
            },
          ],
        }}
        title={recipe?.name}
        description={recipe?.description}
      />
      <Image
        alt={recipe?.name}
        height={800}
        src={recipe?.image}
        width={2400}
        style={imageCSS}
        sizes="100vw"
      />
      <Container size="lg">
        <Card mt="md" mb="lg" p="lg" shadow="sm">
          <Card.Section p={20}>
            <Group position="apart">
              <Stack>
                <Title order={1}>{recipe?.name}</Title>
                <Title order={6}> {recipe?.description} </Title>
              </Stack>
            </Group>
            <Divider my="sm" />
            <Group position="apart">
              <Stack>
                <Text sx={{ maxWidth: "750px" }}>{recipe?.description}</Text>
                {recipe && recipe?.keywords?.length > 0 ? (
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
              </Stack>
              <Stack>
                <Text>Total Time {recipe?.totalTime}</Text>
                {/* <Text>Difficulty {recipe?.difficulty}</Text> */}
              </Stack>
            </Group>
          </Card.Section>
        </Card>

        <Card mt="xs" shadow="sm" withBorder>
          <Title order={2}>Ingredients</Title>

          <List listStyleType="none">
            {recipe?.recipeIngredients.map((ingredient) => (
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
