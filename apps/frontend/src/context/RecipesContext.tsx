import {
  ChangeEvent,
  createContext,
  Dispatch,
  SetStateAction,
  SyntheticEvent,
  useContext,
} from "react";
import { useRecipes } from "hooks/useRecipes";
import { Item } from "../types/recipes";

type RecipesContextType = {
  isLoading: boolean;
  isError: boolean;
  error?: Error | null;
  filteredRecipes?: Item[] | undefined;
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
  ingredients?: string[];
  selectedAllergens?: string[];
  selectedIngredients?: string[];
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
  uniqueAllergens: [
    {
      value: "Eggs",
      label: "Eggs",
      image:
        "https://img.hellofresh.com/c_fill,f_auto,fl_lossy,h_70,q_auto,w_70/hellofresh_s3/allergens/57962a07b7e8697d4b3052f6-63afd198.png",
    },
    {
      value: "Wheat",
      label: "Wheat",
      image:
        "https://img.hellofresh.com/c_fill,f_auto,fl_lossy,h_70,q_auto,w_70/hellofresh_s3/allergens/57962a07b7e8697d4b3052f5-e20d9ca4.png",
    },
    {
      value: "Milk",
      label: "Milk",
      image:
        "https://img.hellofresh.com/c_fill,f_auto,fl_lossy,h_70,q_auto,w_70/hellofresh_s3/allergens/57962a07b7e8697d4b3052fa-be127d3f.png",
    },
    {
      value: "Soy",
      label: "Soy",
      image:
        "https://img.hellofresh.com/c_fill,f_auto,fl_lossy,h_70,q_auto,w_70/hellofresh_s3/allergens/57962a07b7e8697d4b3052f9-feb8e168.png",
    },
    {
      value: "Fish",
      label: "Fish",
      image:
        "https://img.hellofresh.com/c_fill,f_auto,fl_lossy,h_70,q_auto,w_70/hellofresh_s3/allergens/57962a07b7e8697d4b3052f7-feb8e168.png",
    },
    {
      value: "Shellfish",
      label: "Shellfish",
      image:
        "https://img.hellofresh.com/c_fill,f_auto,fl_lossy,h_70,q_auto,w_70/hellofresh_s3/allergens/57962a07b7e8697d4b3052f4-feb8e168.png",
    },
    {
      value: "Tree Nuts",
      label: "Tree Nuts",
      image:
        "https://img.hellofresh.com/c_fill,f_auto,fl_lossy,h_70,q_auto,w_70/hellofresh_s3/allergens/57962a07b7e8697d4b3052fb-172b155c.png",
    },
  ],
  handleSetSelectedAllergens: () => undefined,
  handleSetSelectedIngredients: () => undefined,
  clearSearchHandler: () => undefined,
  onChangeHandler: () => undefined,
  pageChangeHandler: () => undefined,
  page: 1,
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
