import { useRecipes } from "../hooks/useRecipes";
import { MyAppShell } from "./MyAppShell";

export const Layout = ({ children }) => {
  const {
    handleSetSelectedIngredients,
    handleSetSelectedAllergens,
    uniqueAllergens,
    ingredients,
    selectedAllergens,
    selectedIngredients,
  } = useRecipes();

  const appShellProps = {
    uniqueAllergens,
    handleSetSelectedAllergens,
    selectedAllergens,
    ingredients,
    handleSetSelectedIngredients,
    selectedIngredients,
  };

  return <MyAppShell {...appShellProps}>{children}</MyAppShell>;
};
