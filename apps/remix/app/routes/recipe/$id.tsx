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
import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import type { ThrownResponse } from "@remix-run/react";
import { Link, useCatch } from "@remix-run/react";
import { Fragment } from "react";
import Image from "remix-image";
import { typedjson, useTypedLoaderData } from "remix-typedjson";
import { HellofreshImage } from "~/components/HellofreshImage";
import { HF_ICON_IMAGE_URL, HF_STEP_IMAGE_URL } from "~/util/constants";
import { db } from "~/util/db.server";

export const loader = async ({ params }: LoaderArgs) => {
  if (!params.id) {
    throw json({ error: "No id provided" }, { status: 400 });
  }

  const recipe = await db.hellofresh.findFirst({
    where: {
      id: params.id,
    },
  });

  if (!recipe) {
    throw json({ error: "Recipe not found" }, { status: 404 });
  }

  // const recipe = await getRecipeById(params.id);
  return typedjson(recipe);
};

const RecipePage = () => {
  const matches = useMediaQuery("(min-width: 900px)", true);
  const { recipe } = useTypedLoaderData<typeof loader>();

  return (
    <>
      <Affix position={{ bottom: 20, left: 20 }}>
        <Button leftIcon={<ArrowLeftIcon width={12} />}>Go back</Button>
      </Affix>

      <HellofreshImage
        alt={recipe.name}
        height={800}
        src={recipe.imagePath}
        width={1200}
        style={{
          objectFit: "cover",
          width: "100%",
          height: "auto",
          minHeight: "unset",
          minWidth: "unset",
        }}
        dprVariants={[1, 2, 3]}
        responsive={[
          {
            size: {
              width: 1600,
              height: 400,
            },
            maxWidth: 1900,
          },
          {
            size: {
              width: 2200,
              height: 500,
            },
            maxWidth: 2600,
          },
        ]}
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

export function CatchBoundary() {
  // Here, we need to pass the ThrownResponse type, which receives the possible status codes and data as generics
  const caught = useCatch<ThrownResponse<404, { error: string }>>();
  return (
    <main>
      <h1>{caught.data.error}</h1>
      <p>Status {caught.status}</p>
    </main>
  );
}
