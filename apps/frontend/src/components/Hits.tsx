import { Grid } from "@mantine/core";
import { useHits, UseHitsProps } from "react-instantsearch-hooks-web";
import { RecipeHit } from "types/recipeSearchQuery";
import { RecipeCard } from "./RecipeCard";

export const Hits = (props: UseHitsProps<RecipeHit>) => {
  const { hits } = useHits(props);

  return (
    <>
      {hits.map((hit) => (
        <Grid.Col key={hit.objectID} md={1} sm={2}>
          <RecipeCard recipe={hit} />
        </Grid.Col>
      ))}
    </>
  );
};
