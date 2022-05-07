import { SignInButton, UserButton, useSession, useUser } from "@clerk/nextjs";
import { ActionIcon, Center, Container, Indicator, Text, useMantineColorScheme } from "@mantine/core";
import { NextLink } from "@mantine/next";
import { useQuery } from "react-query";
import { Book2, BrandGithub, Home, Login } from "tabler-icons-react";
import { getRecipes } from "../util/getRecipes";
import { MoonIcon } from "./Icons/MoonIcon";
import { SunIcon } from "./Icons/SunIcon";

const SignInOrUserProfile = ({ isSignedIn, dark }) => {
  if (!isSignedIn) {
    return (
      <SignInButton mode="modal">
        <ActionIcon color={dark ? "yellow" : "blue"} size="lg">
          <Login />
        </ActionIcon>
      </SignInButton>
    );
  }
  return <UserButton />;
};

export const NavbarContent = () => {
  const { session } = useSession();
  const { data: recipes } = useQuery(["recipes", session], () => getRecipes(session));
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const { isSignedIn } = useUser();
  const dark = colorScheme === "dark";

  const numRecipes = recipes?.length;

  return (
    <Container>
      <Text align="center" weight="bold">
        Hello Fresh Recipe Search
      </Text>

      <Center>
        <ActionIcon color={dark ? "yellow" : "blue"} component={NextLink} href="/" size="lg" title="Home">
          <Home />
        </ActionIcon>
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
          title="Github"
        >
          <BrandGithub />
        </ActionIcon>
        {isSignedIn && (
          <ActionIcon
            color={dark ? "yellow" : "blue"}
            component={NextLink}
            href="/myrecipes"
            size="lg"
            title="My Recipes"
          >
            <Indicator inline label={numRecipes} size={14}>
              <Book2 />
            </Indicator>
          </ActionIcon>
        )}
        <SignInOrUserProfile dark={dark} isSignedIn={isSignedIn} />
      </Center>
    </Container>
  );
};
