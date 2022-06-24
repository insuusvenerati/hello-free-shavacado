import { getCookie } from "cookies-next";
import { useState } from "react";
import { useQuery } from "react-query";
import { getSuggestedRecipes } from "../util/getSuggestedRecipes";
import { useDebounce } from "./useDebounce";

export const useSuggestedRecipesQuery = () => {
  const token = getCookie("token") as string;
  const [searchText, setSearchText] = useState("");
  const debouncedSearchText = useDebounce(searchText, 500);

  const { data, isLoading, error } = useQuery(
    ["suggested-recipe", token, debouncedSearchText],
    () => getSuggestedRecipes(debouncedSearchText, token),
    { enabled: !!debouncedSearchText && !!token, staleTime: 60 * 60 },
  );

  return { data, isLoading, error, setSearchText, searchText };
};
