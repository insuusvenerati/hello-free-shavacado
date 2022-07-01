import { Grid, Title } from "@mantine/core";
import { Dispatch, memo, SetStateAction } from "react";
import { Item, RecipeQuery } from "../types/recipes";
import { RecipeCard } from "./RecipeCard";

type Props = {
  filteredRecipes: Item[] | undefined;
  modalHandler: () => void;
  setSelectedRecipe: Dispatch<SetStateAction<Item>>;
  popularRecipes: RecipeQuery | undefined;
  isLoading: boolean;
};

export const FilteredOrPopularRecipesList = ({
  filteredRecipes,
  modalHandler,
  setSelectedRecipe,
  popularRecipes,
  isLoading,
}: Props) => {
  if (filteredRecipes) {
    return (
      <Grid columns={4} justify="center">
        {filteredRecipes?.map((recipe) => {
          return (
            <Grid.Col key={recipe.id} md={1} sm={2}>
              <RecipeCard
                handler={modalHandler}
                recipe={recipe}
                setSelectedRecipe={setSelectedRecipe}
              />
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
                  <RecipeCard
                    handler={modalHandler}
                    recipe={recipe}
                    setSelectedRecipe={setSelectedRecipe}
                  />
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
