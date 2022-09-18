import { Hits } from "components/Hits";
import { Avatar, Container, Grid, Group, MantineColor, SelectItemProps, Text } from "@mantine/core";
import { forwardRef } from "react";
import { Pagination, SortBy } from "react-instantsearch-hooks-web";
import { NextSeo } from "next-seo";
import defaultSEO from "../../next-seo.config";

interface ItemProps extends SelectItemProps {
  color: MantineColor;
  description: string;
  image: string;
}

const AutoCompleteItem = forwardRef<HTMLDivElement, ItemProps>(
  ({ description, value, image, ...others }: ItemProps, ref) => {
    return (
      <div ref={ref} {...others}>
        <Group noWrap>
          <Avatar src={image} />

          <div>
            <Text>{value}</Text>
            <Text size="xs" color="dimmed">
              {description}
            </Text>
          </div>
        </Group>
      </div>
    );
  },
);

const Home = () => {
  return (
    <>
      <NextSeo {...defaultSEO} />
      <Container>
        <Grid columns={6} justify="center">
          <Grid.Col md={3}>
            <Pagination />
          </Grid.Col>
          <Grid.Col md={1}>
            <SortBy
              items={[
                { label: "Rating Desc", value: "hellofresh_rating_desc" },
                { label: "Rating Asc", value: "hellofresh_rating_asc" },
                { label: "Featured", value: "hellofresh" },
              ]}
            />
          </Grid.Col>
        </Grid>
      </Container>

      <Grid columns={4} justify="center">
        <Hits />
      </Grid>

      {/* <FilteredOrPopularRecipesList staticRecipes={popularRecipes} modalHandler={modalHandler} /> */}
    </>
  );
};

AutoCompleteItem.displayName = "AutoCompleteItem";

export default Home;
