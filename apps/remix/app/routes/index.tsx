import { getAuth } from "@clerk/remix/ssr.server";
import {
  Accordion,
  Button,
  Code,
  Container,
  CopyButton,
  Grid,
  SimpleGrid,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import type { ActionArgs } from "@remix-run/node";
import { useCatch } from "@remix-run/react";
import { CatchBoundaryComponent } from "@remix-run/react/dist/routeModules";
import { Pagination, SortBy } from "react-instantsearch-hooks-web";
import { typedjson } from "remix-typedjson";
import { z } from "zod";
import { zx } from "zodix";
import { Hits } from "~/components/Hits";
import { db } from "~/util/db.server";

const recipeSchema = z.object({
  slug: z.string(),
  name: z.string(),
  imagePath: z.string(),
  uuid: z.string(),
});

export const action = async ({ request }: ActionArgs) => {
  const { userId, claims } = await getAuth(request);

  if (!userId || !claims) {
    return typedjson({ error: "Not logged in" }, { status: 401 });
  }

  const data = await zx.parseForm(request, recipeSchema);

  const result = await db.recipe.create({
    data: {
      ...data,
      user: {
        connectOrCreate: {
          where: {
            id: userId,
          },
          create: {
            id: userId,
            username: claims.username as string,
            name: claims.name as string,
          },
        },
      },
    },
  });

  return typedjson(result);
};

export default function Index() {
  return (
    <>
      <Container>
        <Grid justify="center">
          <Grid.Col md={9}>
            <Pagination />
          </Grid.Col>
          <Grid.Col md={3}>
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

      <SimpleGrid
        breakpoints={[
          { maxWidth: 980, cols: 3, spacing: "md" },
          { maxWidth: 755, cols: 2, spacing: "sm" },
          { maxWidth: 600, cols: 1, spacing: "sm" },
        ]}
        mt="md"
        cols={4}
      >
        <Hits />
      </SimpleGrid>
    </>
  );
}

export const ErrorBoundary = ({ error }: { error: Error }) => {
  console.log(error);
  return (
    <>
      <Title order={3}>Oops an error occured</Title>
      <Text>{error.message}</Text>
    </>
  );
};

export const CatchBoundary: CatchBoundaryComponent = () => {
  const caught = useCatch();
  console.log(caught);
  return (
    <Container>
      <Title order={3}>Oops an error occured</Title>
      <Text>{caught.statusText}</Text>
      Check the console for errors or expand them here:
      <Accordion>
        <Accordion.Item value="error">
          <Accordion.Control>Error message</Accordion.Control>
          <Accordion.Panel>
            <Stack>
              <CopyButton value={caught.data}>
                {({ copied, copy }) => (
                  <Button onClick={copy} variant={copied ? "light" : "default"}>
                    {copied ? "Copied" : "Copy"}
                  </Button>
                )}
              </CopyButton>
              <Code>{JSON.stringify(caught.data, null, 2)}</Code>
            </Stack>
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>
    </Container>
  );
};
