import { Grid, Transition } from "@mantine/core";
import { useHits, UseHitsProps } from "react-instantsearch-hooks-web";
import { RecipeHit } from "types/recipeSearchQuery";
import { RecipeCard } from "./RecipeCard/RecipeCard";
import { useEffect, useState } from "react";

// transform-origin: 100% 0%; transform: translate(10%,10%) rotate(200deg); opacity:0 transition: 5s all ease-out;

export const Hits = (props: UseHitsProps<RecipeHit>) => {
  const { hits } = useHits(props);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <Transition duration={200} mounted={mounted} transition="skew-down">
      {(styles) => (
        <>
          {hits.map((hit) => (
            <Grid.Col data-test-id="recipe-card" key={hit.objectID} md={1} sm={2}>
              <RecipeCard style={{ ...styles }} recipe={hit} />
            </Grid.Col>
          ))}
        </>
      )}
    </Transition>
  );
};
