/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/forbid-component-props */
import { AdjustmentsHorizontalIcon, MapIcon } from "@heroicons/react/24/outline";
import {
  AppShell,
  Aside,
  Divider,
  Drawer,
  Group,
  List,
  MediaQuery,
  ScrollArea,
  Tabs,
  Text,
  Title,
} from "@mantine/core";
import type { ImportedRecipe, Recipe } from "@prisma/client";
import type { ReactNode } from "react";
import { useState } from "react";
import { CurrentRefinements } from "react-instantsearch-hooks-web";
import { useTypedLoaderData } from "remix-typedjson";
import { ImportedRecipeLink } from "./ImportedRecipeLink";
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
  const { favoriteRecipes, importedRecipes } = useTypedLoaderData<{
    favoriteRecipes: Recipe[];
    importedRecipes: ImportedRecipe[];
  }>();
  const [opened, setOpened] = useState(false);
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

              <List
                center
                listStyleType="none"
                mb="sm"
                mt="sm"
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
        <Drawer padding="md" opened={opened} onClose={() => setOpened(false)}>
          <Tabs defaultValue="navigation">
            <Tabs.List grow>
              <Tabs.Tab icon={<MapIcon width={16} />} value="navigation">
                Navigation
              </Tabs.Tab>
              <Tabs.Tab icon={<AdjustmentsHorizontalIcon width={16} />} value="filters">
                Filters
              </Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel pt="xs" value="navigation">
              <NavbarContent section={section} setSection={setSection} />
            </Tabs.Panel>

            <Tabs.Panel pt="xs" value="filters">
              <Group>
                <ClearRefinements />

                <CurrentRefinements title="Filters" style={{ maxWidth: 300 }} />

                <Group>
                  <Title order={4}>Ingredients</Title>
                  <RefinementList
                    limit={5}
                    showMore
                    title="Ingredients"
                    attribute="ingredients.name"
                  />
                </Group>

                <Group>
                  <Title order={4}>Tags</Title>
                  <RefinementList limit={5} showMore title="Tags" attribute="tags.name" />
                </Group>
              </Group>
            </Tabs.Panel>
          </Tabs>
        </Drawer>
      }
    >
      {children}
    </AppShell>
  );
};
