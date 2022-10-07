import { Grid, Title } from "@mantine/core";
import { memo } from "react";
import { RecipeQuery } from "types/recipes";
import { useRecipesContext } from "../context/RecipesContext";
import { usePopularRecipesQuery } from "hooks/usePopularRecipesQuery";
import { RecipeCard } from "./RecipeCard/RecipeCard";

type Props = {
  modalHandler: () => void;
  staticRecipes: RecipeQuery;
};

export const FilteredOrPopularRecipesList = ({ staticRecipes }: Props) => {
  const { filteredRecipes, isLoading } = useRecipesContext();
  const { data: popularRecipes } = usePopularRecipesQuery(staticRecipes);

  if (filteredRecipes) {
    return (
      <Grid columns={4} justify="center">
        {filteredRecipes?.map((recipe) => {
          return (
            <Grid.Col key={recipe.id} md={1} sm={2}>
              <RecipeCard recipe={recipe} />
            </Grid.Col>
          );
        })}
      </Grid>
    );
  }

  if (popularRecipes && !isLoading) {
    return (
      <>
        <Title mb={10} align="center" order={1}>
          Popular Recipes
        </Title>

        <Grid columns={4} justify="center">
          {popularRecipes.items.length > 0 &&
            popularRecipes?.items.map((recipe) => {
              return (
                <Grid.Col key={recipe.id} md={1} sm={2}>
                  <RecipeCard recipe={recipe} />
                </Grid.Col>
              );
            })}
        </Grid>
      </>
    );
  }

  return null;
};
export const FilteredOrPopularRecipesListMemo = memo(FilteredOrPopularRecipesList);
