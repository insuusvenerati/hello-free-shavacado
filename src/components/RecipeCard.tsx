import {
  Button,
  Card,
  Container,
  Grid,
  Link,
  Row,
  Text,
} from "@nextui-org/react";
import { Item } from "../recipes";

export const RecipeCard = ({ recipe }: { recipe: Item }) => {
  return (
    <Grid xs={12} sm={3}>
      <Link rel="noreferrer" target="_blank" href={recipe.websiteUrl}>
        <Card cover hoverable clickable>
          <Card.Image
            width="100%"
            height={340}
            src={`https://img.hellofresh.com/hellofresh_s3${recipe?.imagePath}`}
          />
          <Card.Footer>
            <Container>
              <Row>
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
      </Link>
    </Grid>
  );
};
