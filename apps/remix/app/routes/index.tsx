import { Container, Grid } from "@mantine/core";
import { Pagination, SortBy } from "react-instantsearch-hooks-web";
import { Hits } from "~/components/Hits";

export default function Index() {
  return (
    <>
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
    </>
  );
}

export const ErrorBoundary = ({ error }: { error: Error }) => {
  return (
    <>
      <h1>Oops an error occured</h1>
      <pre>{JSON.stringify(error, null, 2)}</pre>
    </>
  );
};
