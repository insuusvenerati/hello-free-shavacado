import { XIcon } from "@heroicons/react/outline";
import { ActionIcon, Loader, TextInput, ThemeIcon } from "@mantine/core";
import { useRecipesContext } from "../context/RecipesContext";

export const Search = () => {
  const {
    isLoading,
    isError,
    error,
    filteredRecipes,
    onChangeHandler,
    clearSearchHandler,
    searchText,
    onSubmitHandler,
    isFetching,
  } = useRecipesContext();

  return (
    <form onSubmit={onSubmitHandler}>
      <TextInput
        value={searchText}
        error={isError && error?.message}
        aria-label="Search"
        onChange={onChangeHandler}
        placeholder="Search"
        rightSection={
          isLoading || isFetching ? (
            <Loader size="sm" />
          ) : filteredRecipes ? (
            <ActionIcon onClick={clearSearchHandler} mr="xs">
              <ThemeIcon variant="outline">
                <XIcon width={16} />
              </ThemeIcon>
            </ActionIcon>
          ) : undefined
        }
        disabled={isLoading}
        size="md"
        type="search"
      />
    </form>
  );
};
