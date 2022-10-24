import type { UseHitsProps } from "react-instantsearch-hooks-web";
import { useHits } from "react-instantsearch-hooks-web";
import type { RecipeHit } from "~/types/recipeSearchQuery";
import { RecipeCard } from "./RecipeCard/RecipeCard";

// transform-origin: 100% 0%; transform: translate(10%,10%) rotate(200deg); opacity:0 transition: 5s all ease-out;

export const Hits = (props: UseHitsProps<RecipeHit>) => {
  const { hits } = useHits(props);

  return (
    <>
      {hits.map((hit) => (
        // <Grid.Col data-test-id="recipe-card" key={hit.objectID} md={3} sm={12}>
        <RecipeCard key={hit.objectID} recipe={hit} />
        // </Grid.Col>
      ))}
    </>
  );
};
