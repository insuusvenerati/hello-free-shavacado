import { RecipesProvider, useRecipesContext } from "../context/RecipesContext";
import { MyAppShell } from "./MyAppShell";

export const Layout = ({ children }) => {
  const {
    handleSetSelectedIngredients,
    handleSetSelectedAllergens,
    uniqueAllergens,
    ingredients,
    selectedAllergens,
    selectedIngredients,
  } = useRecipesContext();

  const appShellProps = {
    uniqueAllergens,
    handleSetSelectedAllergens,
    selectedAllergens,
    ingredients,
    handleSetSelectedIngredients,
    selectedIngredients,
  };

  return (
    <RecipesProvider>
      <MyAppShell {...appShellProps}>{children}</MyAppShell>
    </RecipesProvider>
  );
};
