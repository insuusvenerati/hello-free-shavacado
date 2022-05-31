import { SignInButton, UserButton, useSession, useUser } from "@clerk/nextjs";
import { ActionIcon, Center, Container, Indicator, Text, useMantineColorScheme } from "@mantine/core";
import { NextLink } from "@mantine/next";
import { useQuery } from "react-query";
import { HomeIcon, BookmarkIcon, LoginIcon } from "@heroicons/react/outline";
import { Github } from "@icons-pack/react-simple-icons";
import { getRecipes } from "../util/getRecipes";
import { MoonIcon } from "./Icons/MoonIcon";
import { SunIcon } from "./Icons/SunIcon";

const SignInOrUserProfile = ({ isSignedIn, dark }) => {
  if (!isSignedIn) {
    return (
      <SignInButton mode="modal">
        <ActionIcon color={dark ? "yellow" : "blue"} size="md">
          <LoginIcon width={24} />
        </ActionIcon>
      </SignInButton>
    );
  }
  return <UserButton />;
};

export const NavbarContent = () => {
  const { session } = useSession();
  const { data: numRecipes } = useQuery(["recipes", session], () => getRecipes(session), {
    staleTime: 60 * 60,
    refetchOnWindowFocus: false,
    enabled: !!session,
    select: (data) => data.length,
  });
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const { isSignedIn } = useUser();
  const dark = colorScheme === "dark";

  return (
    <Container>
      <Text align="center" weight="bold">
        Hello Fresh Recipe Search
      </Text>

      <Center>
        <ActionIcon color={dark ? "yellow" : "blue"} component={NextLink} href="/" size="md" title="Home">
          <HomeIcon width={24} />
        </ActionIcon>
        <ActionIcon
          color={dark ? "yellow" : "blue"}
          // eslint-disable-next-line react/jsx-no-bind
          onClick={() => toggleColorScheme()}
          size="lg"
          title="Toggle color scheme"
        >
          {dark ? <SunIcon size={24} /> : <MoonIcon size={24} />}
        </ActionIcon>
        <ActionIcon
          color={dark ? "yellow" : "blue"}
          component={NextLink}
          href="https://github.com/insuusvenerati/hello-free-shavacado"
          size="lg"
          target="_blank"
          title="Github"
        >
          <Github width={24} />
        </ActionIcon>
        {isSignedIn && (
          <ActionIcon
            color={dark ? "yellow" : "blue"}
            component={NextLink}
            href="/myrecipes"
            size="md"
            title="My Recipes"
          >
            <Indicator inline label={numRecipes} size={12}>
              <BookmarkIcon width={24} />
            </Indicator>
          </ActionIcon>
        )}
        <SignInOrUserProfile dark={dark} isSignedIn={isSignedIn} />
      </Center>
    </Container>
  );
};
