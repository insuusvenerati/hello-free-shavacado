import { SignInButton } from "@clerk/nextjs";
import { ActionIcon, Center, Text, useMantineColorScheme } from "@mantine/core";
import { NextLink } from "@mantine/next";
import React from "react";
import { BrandGithub, Login } from "tabler-icons-react";
import { MoonIcon } from "./Icons/MoonIcon";
import { SunIcon } from "./Icons/SunIcon";

export const Navbar1 = () => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === "dark";

  return (
    // <Container fluid p="md">
    // <Grid>
    <>
      {/* <MediaQuery largerThan="sm" styles={{ display: "none" }}> */}
      {/* <Grid.Col span={4}> */}
      {/* <Burger onClick={handleDrawer} opened={opened} /> */}
      {/* </Grid.Col> */}
      {/* </MediaQuery> */}
      {/* <Grid.Col span={8}> */}

      <Text align="center" weight="bold">
        Hello Fresh Recipe Search
      </Text>

      {/* </Grid.Col>
      <Grid.Col span={4}> */}
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
        <ActionIcon
          color={dark ? "yellow" : "blue"}
          component={NextLink}
          href="https://github.com/insuusvenerati/hello-free-shavacado"
          size="lg"
          target="_blank"
        >
          <BrandGithub />
        </ActionIcon>
        <SignInButton mode="modal">
          <ActionIcon color={dark ? "yellow" : "blue"} size="lg">
            <Login />
          </ActionIcon>
        </SignInButton>
      </Center>
    </>
    // {/* </Grid.Col> */}
    // </Grid>
    // </Container>
  );
};
