import { Container, Divider, Group, List, Stack, Text, Title } from "@mantine/core";
import Image from "next/image";
import { Fragment } from "react";
import { GetStaticPaths, GetStaticProps } from "next";
import { getAllImportedRecipes, getOneImportedRecipeAnon } from "../../util/getImportedRecipes";
import { createMetaTagsFromRecipe } from "../../util/createMetaTagsFromRecipe";
import { ImportedRecipe } from "../../types/importedRecipe";
import { ShareButton } from "components/Buttons/ShareButton";

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const id = params?.id as string;
  const recipe = await getOneImportedRecipeAnon(id);
  const { openGraphData } = createMetaTagsFromRecipe(recipe);

  return {
    props: { openGraphData, recipe },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const recipes = await getAllImportedRecipes();
  const ids = recipes.map((recipe) => recipe.id);
  const paths = ids.map((id) => ({ params: { id } }));

  return {
    paths,
    fallback: "blocking",
  };
};

const ImportedRecipe = ({ recipe }: { recipe: ImportedRecipe }) => {
  return (
    <>
      <Image
        objectFit="cover"
        alt={recipe.name}
        height={700}
        src={recipe.image}
        width={2200}
        layout="responsive"
      />
      <Container size="lg">
        <Group mt="md" mb="lg" p="lg" position="apart">
          <Stack>
            <Title order={1}>{recipe.name}</Title>
            <Title order={6}> {recipe.description} </Title>
          </Stack>
        </Group>
        <Group>
          <ShareButton image={recipe.image} />
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
      </Container>
    </>
  );
};

export default ImportedRecipe;
