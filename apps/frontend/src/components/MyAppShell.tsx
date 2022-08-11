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
  ScrollArea,
  Stack,
  Text,
  TextInput,
  Title,
  Transition,
} from "@mantine/core";
import { forwardRef, useState } from "react";
import { InstantSearch, RefinementList } from "react-instantsearch-hooks-web";
import { searchClient } from "util/meilisearch";
import { useRecipesContext } from "../context/RecipesContext";
import { useAddImportedRecipeMutation } from "../hooks/useAddImportedRecipeMutation";
import { useFavoriteRecipesQuery } from "../hooks/useFavoriteRecipesQuery";
import { useGetImportedRecipesQuery } from "../hooks/useGetImportedRecipesQuery";
import { ImportedRecipeLink } from "./ImportedRecipeLink";
import { MyHeader } from "./MyHeader";
import { NavbarContent } from "./NavContent";
import { RecipeLink } from "./RecipeLink";

interface ItemProps extends React.ComponentPropsWithoutRef<"div"> {
  image: string;
  label: string;
}

type AppShellProps = {
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

export const MyAppShell = ({ children }: AppShellProps) => {
  const {
    ingredients,
    uniqueAllergens,
    handleSetSelectedAllergens,
    selectedAllergens,
    handleSetSelectedIngredients,
    selectedIngredients,
  } = useRecipesContext();
  const {
    onSubmitHandler,
    error: addImportedRecipeError,
    setUrl,
    isError,
    isLoading: addImportedRecipeLoading,
    url,
  } = useAddImportedRecipeMutation();
  const { data: importedRecipes } = useGetImportedRecipesQuery();

  const { data: recipes, isLoading } = useFavoriteRecipesQuery();
  const [opened, setOpened] = useState(false);
  const [section, setSection] = useState<"nav" | "filters">("nav");

  return (
    <AppShell
      aside={
        <MediaQuery smallerThan="sm" styles={{ display: "none" }}>
          <Aside hiddenBreakpoint="sm" p="md" width={{ sm: 210, lg: 310 }}>
            <Aside.Section grow component={ScrollArea}>
              <LoadingOverlay visible={isLoading} />
              <Title order={3} mb="md">
                Favorite Recipes
              </Title>
              {recipes && recipes?.length > 0 ? (
                <List
                  center
                  listStyleType="none"
                  styles={{
                    withIcon: {
                      height: 55,
                    },
                  }}
                >
                  {recipes?.map((recipe) => (
                    <RecipeLink favoritedRecipe={recipe} key={recipe.id} />
                  ))}
                </List>
              ) : (
                <Text>You don&apos;t have any recipes!</Text>
              )}
              <Divider my="sm" />
              <Title mb="sm" order={3}>
                Imported Recipes
              </Title>
              <Box onSubmit={onSubmitHandler} mb="sm" component="form">
                <TextInput
                  onChange={(event) => setUrl(event.currentTarget.value)}
                  value={url}
                  disabled={addImportedRecipeLoading}
                  error={isError && addImportedRecipeError?.message}
                  placeholder="Enter a URL"
                  label="Import Recipe"
                />
              </Box>
              <List
                center
                listStyleType="none"
                styles={{
                  withIcon: {
                    height: 55,
                  },
                }}
              >
                {importedRecipes?.map((recipe) => (
                  <ImportedRecipeLink key={recipe.id} recipe={recipe} />
                ))}
              </List>
            </Aside.Section>
          </Aside>
        </MediaQuery>
      }
      fixed
      header={<MyHeader opened={opened} setOpened={setOpened} />}
      navbar={
        <Navbar
          sx={{
            overflow: "hidden",
            transition: "width 250ms ease, min-width 250ms ease",
            width: opened ? 300 : 0,
          }}
          // width={opened ? 300 : 0}
          p={opened ? "sm" : 0}
        >
          <NavbarContent showSegmentedControl section={section} setSection={setSection} />

          <Transition
            mounted={section === "filters"}
            transition="slide-right"
            duration={200}
            timingFunction="ease"
          >
            {(styles) => (
              <>
                <Title order={4}>Ingredients</Title>
                <RefinementList style={styles} attribute="recipe.ingredients.name" />

                <Title order={4}>Tags</Title>
                <RefinementList style={styles} attribute="recipe.tags.name" />
              </>

              // <Stack sx={{ padding: 5 }}>
              //   {ingredients && (
              //     <div style={styles}>
              //       <MultiSelect
              //         clearable
              //         data={uniqueAllergens}
              //         itemComponent={MySelectItem}
              //         label="Filter allergens"
              //         nothingFound="Search for a recipe first"
              //         onChange={handleSetSelectedAllergens}
              //         placeholder="Select your allergens"
              //         searchable
              //         value={selectedAllergens}
              //       />
              //       <MultiSelect
              //         clearable
              //         data={ingredients}
              //         label="Filter ingredients"
              //         nothingFound="Search for a recipe first"
              //         onChange={handleSetSelectedIngredients}
              //         placeholder="Select your ingredients"
              //         searchable
              //         value={selectedIngredients}
              //       />
              //     </div>
              //   )}
              // </Stack>
            )}
          </Transition>
        </Navbar>
      }
    >
      {children}
    </AppShell>
  );
};
