import {
  ActionIcon,
  Burger,
  Center,
  Container,
  Grid,
  Text,
  useMantineColorScheme,
} from "@mantine/core";
import React from "react";
import { MoonIcon } from "./Icons/MoonIcon";
import { SunIcon } from "./Icons/SunIcon";

export const Navbar1 = ({ handleDrawer, opened }) => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === "dark";

  return (
    <Container fluid p="md">
      <Grid>
        <Grid.Col span={4}>
          <Burger onClick={handleDrawer} opened={opened} />
        </Grid.Col>
        <Grid.Col span={4}>
          <Text align="center" weight="bold">
            Hello Fresh Recipe Search
          </Text>
        </Grid.Col>
        <Grid.Col span={4}>
          <Center>
            <ActionIcon
              color={dark ? "yellow" : "blue"}
              // eslint-disable-next-line react/jsx-no-bind
              onClick={() => toggleColorScheme()}
              size="lg"
              title="Toggle color scheme"
              variant="outline"
            >
              {dark ? <SunIcon size={18} /> : <MoonIcon size={18} />}
            </ActionIcon>
          </Center>
        </Grid.Col>
      </Grid>
    </Container>
  );
};
