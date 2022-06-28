import { SignInButton, UserButton, useUser } from "@clerk/nextjs";
import { BookmarkIcon, CakeIcon, HomeIcon, LoginIcon } from "@heroicons/react/outline";
import { Github } from "@icons-pack/react-simple-icons";
import {
  ActionIcon,
  Center,
  Indicator,
  Text,
  ThemeIcon,
  useMantineColorScheme,
} from "@mantine/core";
import { NextLink } from "@mantine/next";
import { useFavoriteRecipesQuery } from "../hooks/useFavoriteRecipesQuery";
import { MoonIcon } from "./Icons/MoonIcon";
import { SunIcon } from "./Icons/SunIcon";

const SignInOrUserProfile = ({ isSignedIn, dark }) => {
  if (!isSignedIn) {
    return (
      <SignInButton mode="modal">
        <ActionIcon color={dark ? "yellow" : "blue"} size="md">
          <ThemeIcon>
            <LoginIcon width={24} />
          </ThemeIcon>
        </ActionIcon>
      </SignInButton>
    );
  }
  return <UserButton />;
};

export const NavbarContent = () => {
  const { data } = useFavoriteRecipesQuery();
  // eslint-disable-next-line @typescript-eslint/unbound-method
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const { isSignedIn } = useUser();
  const dark = colorScheme === "dark";

  const numRecipes = data?.length;

  return (
    <>
      <Text mt="md" align="center" weight="bold">
        Hello Fresh Recipe Search
      </Text>

      <Center>
        <ActionIcon
          color={dark ? "yellow" : "blue"}
          component={NextLink}
          href="/"
          size="md"
          title="Home"
        >
          <ThemeIcon variant="outline">
            <HomeIcon width={24} />
          </ThemeIcon>
        </ActionIcon>
        <ActionIcon
          color={dark ? "yellow" : "blue"}
          // eslint-disable-next-line react/jsx-no-bind
          onClick={() => toggleColorScheme()}
          size="lg"
          title="Toggle color scheme"
        >
          <ThemeIcon variant="outline">
            {dark ? <SunIcon size={24} /> : <MoonIcon size={24} />}
          </ThemeIcon>
        </ActionIcon>
        <ActionIcon
          color={dark ? "yellow" : "blue"}
          component={NextLink}
          href="https://github.com/insuusvenerati/hello-free-shavacado"
          size="lg"
          target="_blank"
          title="Github"
        >
          <ThemeIcon variant="outline">
            <Github width={22} />
          </ThemeIcon>
        </ActionIcon>
        {isSignedIn && numRecipes && (
          <ActionIcon
            color={dark ? "yellow" : "blue"}
            component={NextLink}
            href="/myrecipes"
            size="md"
            title="My Recipes"
          >
            <Indicator
              disabled={numRecipes < 1}
              label={<Text size="xs">{numRecipes}</Text>}
              size={16}
            >
              <ThemeIcon variant="outline">
                <BookmarkIcon width={24} />
              </ThemeIcon>
            </Indicator>
          </ActionIcon>
        )}

        <ActionIcon size="lg" href="/groceries" component={NextLink}>
          <ThemeIcon variant="outline">
            <CakeIcon width={22} />
          </ThemeIcon>
        </ActionIcon>

        <SignInOrUserProfile dark={dark} isSignedIn={isSignedIn} />
      </Center>
    </>
  );
};
