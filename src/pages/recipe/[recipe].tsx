/* eslint-disable react/jsx-no-bind */
import { DocumentIcon } from "@heroicons/react/outline";
import {
  Accordion,
  Button,
  Card,
  Container,
  Divider,
  Grid,
  Group,
  Header,
  List,
  LoadingOverlay,
  Space,
  Text,
  Title,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { NextLink } from "@mantine/next";
import { getCookie } from "cookies-next";
import { GetServerSideProps } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import { QueryClient } from "react-query";
import { AddToFavorites } from "../../components/Buttons/AddToFavorites";
import { NavbarContent } from "../../components/NavContent";
import { useHellofreshBySlug } from "../../hooks/useHellofreshBySlug";
import {
  HELLOFRESH_SEARCH_URL,
  HF_AVATAR_IMAGE_URL,
  HF_ICON_IMAGE_URL,
  HF_PLACEHOLDERURL,
  HF_STEP_IMAGE_URL,
} from "../../util/constants";
import { hellofreshSearchBySlug } from "../../util/hellofresh";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const queryClient = new QueryClient();
  const token = getCookie("token", ctx).toString();
  const { recipe } = ctx.params;
  const data = await hellofreshSearchBySlug({ token, slug: recipe as string });

  await queryClient.prefetchQuery(["hellofresh-by-slug", recipe, token], async () => {
    const response = await fetch(`${HELLOFRESH_SEARCH_URL}?take=1&q=${recipe}`, {
      headers: { authorization: `Bearer ${token}` },
    });
    return await response.json();
  });

  return { props: { data } };
};

const Recipe = () => {
  const matches = useMediaQuery("(min-width: 900px)", true);
  const router = useRouter();
  const token = getCookie("token");
  const { recipe: slug } = router.query;
  const { data: recipes, isLoading } = useHellofreshBySlug(slug?.toString(), token?.toString());
  const recipe = recipes?.items[0];

  if (isLoading) return <LoadingOverlay visible />;

  return (
    <>
      <Header height={70} mt={12}>
        <NavbarContent />
      </Header>
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
            <Accordion initialItem={1} offsetIcon={false}>
              <Accordion.Item
                label={
                  <Text size="lg" weight="bold">
                    Ingredients
                  </Text>
                }
              >
                <Grid columns={6}>
                  <Grid.Col lg={3} sm={6}>
                    {recipe?.ingredients.slice(0, 5).map((ingredient) => (
                      <Group key={ingredient.id} p="xs">
                        <Image
                          alt={ingredient.description}
                          height={60}
                          src={`${HF_AVATAR_IMAGE_URL}/${ingredient.imagePath}`}
                          width={60}
                        />
                        {ingredient.name}
                      </Group>
                    ))}
                  </Grid.Col>
                  <Grid.Col lg={3} sm={6}>
                    {recipe?.ingredients.slice(5).map((ingredient) => (
                      <Group key={ingredient.id} p="xs">
                        <Image
                          alt={ingredient.description}
                          height={60}
                          src={`${HF_AVATAR_IMAGE_URL}/${ingredient.imagePath}`}
                          width={60}
                        />
                        {ingredient.name}
                      </Group>
                    ))}
                  </Grid.Col>
                </Grid>
              </Accordion.Item>
            </Accordion>
          </Card>
          <Card mt="xs" shadow="sm" withBorder>
            <Group>
              <Title order={2}>Instructions</Title>
              <List listStyleType="none" size="xl">
                {recipe?.steps?.map((step) => (
                  <>
                    <Group key={step.index + Math.random()} mb={24}>
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
                  </>
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
