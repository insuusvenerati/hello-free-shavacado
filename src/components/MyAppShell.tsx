import {
  AppShell,
  Burger,
  Container,
  Header,
  MediaQuery,
  MultiSelect,
  Navbar,
  Stack,
  Text,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { useCallback, useState } from "react";
import { NavbarContent } from "./NavContent";

export const MyAppShell = ({ children, ...props }) => {
  const matches = useMediaQuery("(min-width: 900px)", true);
  const [opened, setOpened] = useState(false);

  const handleDrawer = useCallback(() => {
    setOpened(!opened);
  }, [opened]);

  const {
    allergens,
    handleSetSelectedAllergens,
    selectedAllergens,
    ingredients,
    handleSetSelectedIngredients,
    selectedIngredients,
  } = props;

  return (
    <AppShell
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
                <Burger
                  mr="xl"
                  onClick={handleDrawer}
                  opened={opened}
                  size="sm"
                />

                <Text>Hello Free Shavacado</Text>
              </div>
            </Header>
          </MediaQuery>
        ) : undefined
      }
      navbar={
        <Navbar
          hidden={!opened}
          hiddenBreakpoint="sm"
          p="md"
          width={{ base: 300 }}
        >
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
