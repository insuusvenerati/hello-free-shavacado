import type { UseInfiniteHitsProps } from "react-instantsearch-hooks-web";
import { useInfiniteHits } from "react-instantsearch-hooks-web";
import type { RecipeHit } from "~/types/recipe";
import { RecipeCard } from "./RecipeCard";

export const RecipeHits = (props: UseInfiniteHitsProps<RecipeHit>) => {
  const { hits } = useInfiniteHits(props);

  if (!hits.length) {
    return (
      <p className="text-center text-xl">
        No recipes found using these filters
      </p>
    );
  }

  return (
    <>
      {hits.map((hit) => (
        <RecipeCard key={hit.objectID} recipe={hit} />
      ))}
    </>
  );
};
