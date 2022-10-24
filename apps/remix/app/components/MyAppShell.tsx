/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/forbid-component-props */
import {
  AppShell,
  Aside,
  Divider,
  Group,
  List,
  MediaQuery,
  Navbar,
  ScrollArea,
  Text,
  Title,
  Transition,
} from "@mantine/core";
import { useClickOutside } from "@mantine/hooks";
import type { ReactNode } from "react";
import { useState } from "react";
import { CurrentRefinements } from "react-instantsearch-hooks-web";
import { useTypedLoaderData } from "remix-typedjson";
import type { FavoritedRecipe } from "~/types/favoriteRecipe";
import { AddImportedRecipeForm } from "./AddImportedRecipeForm";
import { MyHeader } from "./MyHeader";
import { NavbarContent } from "./NavContent";
import { RecipeLink } from "./RecipeLink";
import { ClearRefinements } from "./Search/ClearRefinements";
import { RefinementList } from "./Search/RefinementList";

type AppShellProps = {
  children: ReactNode;
};

export const MyAppShell = ({ children }: AppShellProps) => {
  // const { data: importedRecipes } = useGetImportedRecipesQuery();
  // const { data: recipes, isLoading } = useFavoriteRecipesQuery();
  const { favoriteRecipes } = useTypedLoaderData<{ favoriteRecipes: FavoritedRecipe[] }>();
  const [opened, setOpened] = useState(false);
  const ref = useClickOutside(() => setOpened(false));
  const [section, setSection] = useState<"nav" | "filters">("nav");

  return (
    <AppShell
      // padding="md"
      aside={
        <MediaQuery smallerThan="sm" styles={{ display: "none" }}>
          <Aside hiddenBreakpoint="sm" p="md" width={{ sm: 210, lg: 310 }}>
            <Aside.Section grow component={ScrollArea}>
              <Title order={3} mb="md">
                Favorite Recipes
              </Title>
              {favoriteRecipes && favoriteRecipes?.length > 0 ? (
                <List
                  center
                  listStyleType="none"
                  styles={{
                    withIcon: {
                      height: 55,
                    },
                  }}
                >
                  {favoriteRecipes?.map((recipe) => (
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

              <AddImportedRecipeForm />

              <List
                center
                listStyleType="none"
                styles={{
                  withIcon: {
                    height: 55,
                  },
                }}
              >
                {/* {importedRecipes?.map((recipe) => (
                  <ImportedRecipeLink key={recipe.id} recipe={recipe} />
                ))} */}
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
          ref={ref}
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
                <Group style={styles}>
                  <ClearRefinements />

                  <CurrentRefinements style={{ maxWidth: 300 }} />

                  <Group>
                    <Title order={4}>Ingredients</Title>
                    <RefinementList limit={5} showMore attribute="ingredients.name" />
                  </Group>

                  <Group>
                    <Title order={4}>Tags</Title>
                    <RefinementList limit={5} showMore attribute="tags.name" />
                  </Group>
                </Group>
              </>
            )}
          </Transition>
        </Navbar>
      }
    >
      {children}
    </AppShell>
  );
};
