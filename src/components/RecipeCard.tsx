import { Button, Card, Container, Grid, Row, Text } from "@nextui-org/react";
import Image from "next/image";
import { useCallback } from "react";
import { Item } from "../types/recipes";

type Props = {
  recipe: Item;
  handler: () => void;
  setSelectedRecipe: (recipe: Item) => void;
};

export const RecipeCard = ({ recipe, handler, setSelectedRecipe }: Props) => {
  const selectedRecipeHandler = useCallback(() => {
    setSelectedRecipe(recipe);
  }, [setSelectedRecipe, recipe]);

  return (
    <Card
      clickable
      cover
      hoverable
      onClick={handler}
      onMouseEnter={selectedRecipeHandler}
    >
      <Card.Body>
        <Image
          alt={recipe.name}
          height={340}
          src={`https://img.hellofresh.com/hellofresh_s3${recipe?.imagePath}`}
          width={600}
        />
      </Card.Body>
      <Card.Footer>
        <Container>
          <Row justify="space-between">
            <Text h4 weight="bold">
              {recipe?.name}
            </Text>
          </Row>
          {recipe.tags.length > 0 && (
            <Grid.Container>
              {recipe.tags.map((tag) => (
                <Grid key={tag.id} sm={3} xs={4}>
                  <Button size="xs">{tag.name}</Button>
                </Grid>
              ))}
            </Grid.Container>
          )}
        </Container>
      </Card.Footer>
    </Card>
  );
};
