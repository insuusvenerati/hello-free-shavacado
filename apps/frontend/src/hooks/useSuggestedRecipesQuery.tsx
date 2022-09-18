import { useState } from "react";
import { useQuery } from "react-query";
import { getSuggestedRecipes } from "../util/getSuggestedRecipes";
import { useDebounce } from "./useDebounce";

export const useSuggestedRecipesQuery = () => {
  const [searchText, setSearchText] = useState("");
  const debouncedSearchText = useDebounce(searchText, 500);

  const { data, isLoading, error } = useQuery(
    ["suggested-recipe", debouncedSearchText],
    () => getSuggestedRecipes(debouncedSearchText),
    { enabled: !!debouncedSearchText },
  );

  return { data, isLoading, error, setSearchText, searchText };
};
