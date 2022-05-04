import { SignInButton, UserButton, useUser } from "@clerk/nextjs";
import { ActionIcon, Center, Text, useMantineColorScheme } from "@mantine/core";
import { NextLink } from "@mantine/next";
import { BrandGithub, Login } from "tabler-icons-react";
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
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const { isSignedIn } = useUser();
  const dark = colorScheme === "dark";

  return (
    <>
      <Text align="center" weight="bold">
        Hello Fresh Recipe Search
      </Text>

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
        <SignInOrUserProfile dark={dark} isSignedIn={isSignedIn} />
      </Center>
    </>
  );
};
