import { Grid, Space, Title } from "@mantine/core";
import { Dispatch, SetStateAction } from "react";
import { Item } from "../types/recipes";
import { RecipeCard } from "./RecipeCard";

type Props = {
  filteredRecipes: Item[];
  modalHandler: () => void;
  setSelectedRecipe: Dispatch<SetStateAction<Item>>;
  popularRecipes: Item[];
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
        <Title align="center" order={1}>
          Popular Recipes
        </Title>
        <Space h={10} />
        <Grid columns={4} justify="center">
          {popularRecipes?.map((recipe) => {
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
