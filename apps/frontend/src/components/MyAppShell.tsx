/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/forbid-component-props */
import {
  AppShell,
  Aside,
  Avatar,
  Box,
  Divider,
  Group,
  List,
  LoadingOverlay,
  MediaQuery,
  MultiSelect,
  Navbar,
  SelectItem,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { forwardRef, useState } from "react";
import { useAddImportedRecipeMutation } from "../hooks/useAddImportedRecipeMutation";
import { useFavoriteRecipesQuery } from "../hooks/useFavoriteRecipesQuery";
import { MyHeader } from "./MyHeader";
import { NavbarContent } from "./NavContent";
import { RecipeLink } from "./RecipeLink";

interface ItemProps extends React.ComponentPropsWithoutRef<"div"> {
  image: string;
  label: string;
}

type AppShellProps = {
  uniqueAllergens: SelectItem[];
  handleSetSelectedAllergens: (value: string[]) => void;
  selectedAllergens: string[];
  ingredients: string[];
  handleSetSelectedIngredients: (value: string[]) => void;
  selectedIngredients: string[];
  children: JSX.Element[] | JSX.Element;
};

// eslint-disable-next-line react/display-name
const MySelectItem = forwardRef<HTMLDivElement, ItemProps>(
  ({ image, label, ...others }: ItemProps, ref) => (
    <div ref={ref} {...others}>
      <Group noWrap>
        <Avatar src={image} />

        <div>
          <Text>{label}</Text>
        </div>
      </Group>
    </div>
  ),
);

export const MyAppShell = ({ children, ...props }: AppShellProps) => {
  const {
    uniqueAllergens,
    handleSetSelectedAllergens,
    selectedAllergens,
    ingredients,
    handleSetSelectedIngredients,
    selectedIngredients,
  } = props;
  const {
    onSubmitHandler,
    error: addImportedRecipeError,
    setUrl,
    isError,
    isLoading: addImportedRecipeLoading,
    url,
  } = useAddImportedRecipeMutation();

  const { data: recipes, isLoading } = useFavoriteRecipesQuery();
  const [opened, setOpened] = useState(false);

  return (
    <AppShell
      aside={
        <MediaQuery smallerThan="sm" styles={{ display: "none" }}>
          <Aside hiddenBreakpoint="sm" p="md" width={{ sm: 200, lg: 300 }}>
            <LoadingOverlay visible={isLoading} />
            <Text size="lg" weight="bold" mb="md">
              Favorite Recipes
            </Text>
            <Box onSubmit={onSubmitHandler} mb="sm" component="form">
              <TextInput
                onChange={(event) => setUrl(event.currentTarget.value)}
                value={url}
                disabled={addImportedRecipeLoading}
                error={isError && addImportedRecipeError.message}
                placeholder="Enter a URL"
                label="Import Recipe"
              />
            </Box>
            {recipes?.length > 0 ? (
              <List
                center
                listStyleType="none"
                styles={{
                  withIcon: {
                    height: 55,
                  },
                }}
              >
                {recipes.map((recipe) => (
                  <RecipeLink favoritedRecipe={recipe} key={recipe.id} />
                ))}
              </List>
            ) : (
              <Text>You don&apos;t have any recipes!</Text>
            )}
            <Divider my="sm" />
          </Aside>
        </MediaQuery>
      }
      fixed
      header={<MyHeader opened={opened} setOpened={setOpened} />}
      navbar={
        <Navbar hidden={!opened} hiddenBreakpoint="sm" width={{ base: 300 }}>
          <NavbarContent />

          <Stack sx={{ padding: 5 }}>
            <MultiSelect
              clearable
              data={uniqueAllergens}
              itemComponent={MySelectItem}
              label="Filter allergens"
              nothingFound="Search for a recipe first"
              onChange={handleSetSelectedAllergens}
              placeholder="Select your allergens"
              searchable
              value={selectedAllergens}
            />
            <MultiSelect
              clearable
              data={ingredients}
              label="Filter ingredients"
              nothingFound="Search for a recipe first"
              onChange={handleSetSelectedIngredients}
              placeholder="Select your ingredients"
              searchable
              value={selectedIngredients}
            />
          </Stack>
        </Navbar>
      }
      navbarOffsetBreakpoint="sm"
    >
      {children}
    </AppShell>
  );
};
