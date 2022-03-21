import { Button, Card, Container, Grid, Row, Text } from "@nextui-org/react";
import { Item } from "../recipes";

const baseUrl = "https://hellofresh.com/recipes";

export const RecipeCard = ({
  recipe,
  handler,
  setSelectedRecipe,
}: {
  recipe: Item;
}) => {
  const recipeUrl = `${baseUrl}/${recipe.slug}-${recipe.id}`;

  return (
    <Grid xs={12} sm={3}>
      {/* <Link rel="noreferrer" target="_blank" href={recipeUrl}> */}
      <Card
        onMouseEnter={() => setSelectedRecipe(recipe)}
        onClick={handler}
        hoverable
        cover
        clickable
      >
        <Card.Image
          width="100%"
          height={340}
          src={`https://img.hellofresh.com/hellofresh_s3${recipe?.imagePath}`}
        />
        <Card.Footer>
          <Container>
            <Row justify="space-between">
              <Text weight="bold" h4 color="black">
                {recipe?.name}
              </Text>
            </Row>
            {recipe.tags.length > 0 && (
              <Grid.Container>
                {recipe.tags.map((tag) => (
                  <Grid xs={4} sm={3} key={tag.id}>
                    <Button size="xs">{tag.name}</Button>
                  </Grid>
                ))}
              </Grid.Container>
            )}
          </Container>
        </Card.Footer>
      </Card>
      {/* </Link> */}
    </Grid>
  );
};
