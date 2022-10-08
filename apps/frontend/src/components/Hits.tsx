import { Grid } from "@mantine/core";
import { useHits, UseHitsProps } from "react-instantsearch-hooks-web";
import { RecipeHit } from "types/recipeSearchQuery";
import { RecipeCard } from "./RecipeCard/RecipeCard";

// transform-origin: 100% 0%; transform: translate(10%,10%) rotate(200deg); opacity:0 transition: 5s all ease-out;

export const Hits = (props: UseHitsProps<RecipeHit>) => {
  const { hits } = useHits(props);

  return (
    <>
      {hits.map((hit) => (
        <Grid.Col data-test-id="recipe-card" key={hit.objectID} md={1} sm={2}>
          <RecipeCard recipe={hit} />
        </Grid.Col>
      ))}
    </>
  );
};
