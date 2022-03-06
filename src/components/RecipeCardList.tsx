import { Item } from "../recipes";
import { RecipeCard } from "./RecipeCard";

export const RecipeCardList = ({
  recipes,
  selectedAllergens,
}: {
  recipes: Item[];
  selectedAllergens: string[];
}) => {
  const filteredRecipes = recipes.filter((recipe) =>
    selectedAllergens.some((selectedAllergen) =>
      recipe.allergens.some((aa) => aa.name === selectedAllergen)
    )
  );

  console.log("filtered recipes", filteredRecipes);

  if (filteredRecipes.length > 0) {
    return (
      <>
        {filteredRecipes.map((recipe) => (
          <RecipeCard recipe={recipe} key={recipe.id} />
        ))}
      </>
    );
  }

  return (
    <>
      {recipes.map((recipe) => (
        <RecipeCard key={recipe.id} recipe={recipe} />
      ))}
    </>
  );
};
