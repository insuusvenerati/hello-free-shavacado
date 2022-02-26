import { Card, Grid, Link, Text } from "@nextui-org/react";
import { Item } from "../recipes";

export const RecipeCard = ({ recipe }: { recipe: Item }) => {
  return (
    <Grid xs={12} sm={3}>
      <Link rel="noreferrer" target="_blank" href={recipe.websiteUrl}>
        <Card cover hoverable clickable>
          <Card.Header css={{ position: "absolute", zIndex: 1, top: 5 }}>
            <Text weight="bold" h4 color="black">
              {recipe?.name}
            </Text>
          </Card.Header>
          <Card.Image
            width="100%"
            height={340}
            src={`https://img.hellofresh.com/hellofresh_s3${recipe?.imagePath}`}
          />
        </Card>
      </Link>
    </Grid>
  );
};
