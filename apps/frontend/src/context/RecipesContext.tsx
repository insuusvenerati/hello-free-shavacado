import {
  ChangeEvent,
  createContext,
  Dispatch,
  SetStateAction,
  SyntheticEvent,
  useContext,
} from "react";
import { useRecipes } from "../hooks/useRecipes";
import { Item } from "../types/recipes";

type RecipesContextType = {
  isLoading: boolean;
  isError: boolean;
  error?: Error | null;
  filteredRecipes: Item[] | undefined;
  selectedRecipe?: Item;
  recipesTotal?: number;
  page: number;
  setSelectedRecipe: Dispatch<SetStateAction<Item>>;
  clearSearchHandler: () => void;
  onChangeHandler: (event: ChangeEvent<HTMLInputElement>) => void;
  pageChangeHandler: (page: number) => void;
  handleSetSelectedIngredients: (value: string[]) => void;
  handleSetSelectedAllergens: (value: string[]) => void;
  uniqueAllergens: {
    value: string;
    label: string;
    image: string;
  }[];
  ingredients: string[];
  selectedAllergens: string[];
  selectedIngredients: string[];
  searchText?: string;
  onSubmitHandler: (event: SyntheticEvent<HTMLFormElement>) => void;
  isFetching: boolean;
  setSearchText: (text: string) => void;
  isSuccess: boolean;
};

const RecipesContext = createContext<RecipesContextType>({
  setSelectedRecipe: () => undefined,
  isLoading: false,
  isError: false,
  isFetching: false,
  isSuccess: false,
  uniqueAllergens: [],
  handleSetSelectedAllergens: () => undefined,
  handleSetSelectedIngredients: () => undefined,
  clearSearchHandler: () => undefined,
  onChangeHandler: () => undefined,
  pageChangeHandler: () => undefined,
  filteredRecipes: [],
  ingredients: [],
  page: 1,
  selectedAllergens: [],
  selectedIngredients: [],
  onSubmitHandler: () => undefined,
  setSearchText: () => undefined,
});

export const RecipesProvider = ({ children }) => {
  const recipes = useRecipes();

  return <RecipesContext.Provider value={recipes}>{children}</RecipesContext.Provider>;
};

export const useRecipesContext = () => {
  const recipesContext = useContext(RecipesContext);
  return recipesContext;
};
