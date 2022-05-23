/* eslint-disable react/forbid-component-props */
import { useSession } from "@clerk/nextjs";
import {
  AppShell,
  Aside,
  Burger,
  Container,
  Header,
  List,
  LoadingOverlay,
  MediaQuery,
  MultiSelect,
  Navbar,
  Stack,
  Text,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { useCallback, useState } from "react";
import { useQuery } from "react-query";
import { getRecipes } from "../util/getRecipes";
import { NavbarContent } from "./NavContent";
import { RecipeLink } from "./RecipeLInk";

export const MyAppShell = ({ children, ...props }) => {
  const {
    allergens,
    handleSetSelectedAllergens,
    selectedAllergens,
    ingredients,
    handleSetSelectedIngredients,
    selectedIngredients,
  } = props;
  const { session } = useSession();
  const { data: recipes, isLoading } = useQuery(["recipes", session], () => getRecipes(session), {
    staleTime: 60 * 60 * 24,
    refetchOnWindowFocus: false,
    notifyOnChangeProps: ["data", "error"],
  });
  const matches = useMediaQuery("(min-width: 900px)", true);
  const [opened, setOpened] = useState(false);

  const handleDrawer = useCallback(() => {
    setOpened(!opened);
  }, [opened]);

  return (
    <AppShell
      aside={
        <MediaQuery smallerThan="sm" styles={{ display: "none" }}>
          <Aside hiddenBreakpoint="sm" p="md" width={{ sm: 200, lg: 300 }}>
            <LoadingOverlay visible={isLoading} />
            <Text size="lg" weight="bold">
              Favorite Recipes
            </Text>
            {recipes?.length > 0 ? (
              <List>
                {recipes.map((recipe) => (
                  <RecipeLink favoritedRecipe={recipe} key={recipe.id} />
                ))}
              </List>
            ) : (
              <Text>You don&apos;t have any recipes!</Text>
            )}
          </Aside>
        </MediaQuery>
      }
      fixed
      header={
        !matches ? (
          <MediaQuery largerThan="sm" styles={{ display: "none" }}>
            <Header height={70} p="md">
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  height: "100%",
                }}
              >
                <Burger mr="xl" onClick={handleDrawer} opened={opened} size="sm" />

                <Text>Hello Free Shavacado</Text>
              </div>
            </Header>
          </MediaQuery>
        ) : null
        // (
        //   <Header height={70} p="lg">
        //     <Center>
        //       <Text size="lg" weight="bold">
        //         Hello Free Shavacado
        //       </Text>
        //     </Center>
        //   </Header>
        // )
      }
      navbar={
        <Navbar hidden={!opened} hiddenBreakpoint="sm" p="md" width={{ base: 300 }}>
          <NavbarContent />
          <Container p="md">
            <Stack>
              <MultiSelect
                clearable
                data={allergens}
                label="Filter allergens"
                onChange={handleSetSelectedAllergens}
                placeholder="Select an allergen"
                searchable
                value={selectedAllergens}
              />
              <MultiSelect
                clearable
                data={ingredients}
                label="Filter ingredients"
                onChange={handleSetSelectedIngredients}
                placeholder="Select your ingredients"
                searchable
                value={selectedIngredients}
              />
            </Stack>
          </Container>
        </Navbar>
      }
      navbarOffsetBreakpoint="sm"
    >
      {children}
    </AppShell>
  );
};
