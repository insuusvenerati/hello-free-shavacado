/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/forbid-component-props */
import { InformationCircleIcon } from "@heroicons/react/outline";
import {
  Alert,
  AppShell,
  Aside,
  Avatar,
  Burger,
  Container,
  Group,
  Header,
  List,
  LoadingOverlay,
  MediaQuery,
  MultiSelect,
  Navbar,
  SelectItem,
  Stack,
  Text,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { forwardRef, useCallback, useState } from "react";
import { useQuery } from "react-query";
import { getRecipes } from "../util/getRecipes";
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

  const { data: recipes, isLoading } = useQuery(["recipes"], () => getRecipes(), {
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
            <Alert icon={<InformationCircleIcon width={16} />} title="Bummer!" color="red">
              Favorites are not being saved at the moment
            </Alert>
            <Text size="lg" weight="bold" mb="md">
              Favorite Recipes
            </Text>
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
      }
      navbar={
        <Navbar hidden={!opened} hiddenBreakpoint="sm" p="md" width={{ base: 300 }}>
          <NavbarContent />
          <Container p="md">
            <Stack>
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
          </Container>
        </Navbar>
      }
      navbarOffsetBreakpoint="sm"
    >
      {children}
    </AppShell>
  );
};
