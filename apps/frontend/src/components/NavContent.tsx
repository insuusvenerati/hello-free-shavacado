import { SignInButton, UserButton, useUser } from "@clerk/nextjs";
import { BookmarkIcon, CakeIcon, HomeIcon, LoginIcon } from "@heroicons/react/outline";
import {
  ActionIcon,
  Center,
  createStyles,
  Group,
  MantineStyleSystemProps,
  Text,
  ThemeIcon,
  useMantineColorScheme,
} from "@mantine/core";
import { NextLink } from "@mantine/next";
import { Github } from "./Icons/Github";
import { MoonIcon } from "./Icons/MoonIcon";
import { SunIcon } from "./Icons/SunIcon";

const useStyles = createStyles((theme) => {
  return {
    title: {
      textTransform: "uppercase",
      letterSpacing: -0.25,
    },
  };
});

const SignInOrUserProfile = ({ isSignedIn, dark }) => {
  if (!isSignedIn) {
    return (
      <SignInButton mode="modal">
        <ActionIcon color={dark ? "yellow" : "blue"} size="lg">
          <ThemeIcon>
            <LoginIcon width={24} />
          </ThemeIcon>
        </ActionIcon>
      </SignInButton>
    );
  }
  return <UserButton />;
};

export const NavbarContent = ({ marginTop = 0 }: { marginTop?: MantineStyleSystemProps["mt"] }) => {
  const { classes } = useStyles();
  // eslint-disable-next-line @typescript-eslint/unbound-method
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const { isSignedIn, user } = useUser();
  const dark = colorScheme === "dark";

  return (
    <>
      <Text weight={500} size="sm" className={classes.title} color="dimmed">
        {user?.primaryEmailAddress?.emailAddress}
      </Text>
      <Center mt={marginTop}>
        <Group>
          <ActionIcon
            color={dark ? "yellow" : "blue"}
            component={NextLink}
            href="/"
            size="lg"
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
          {isSignedIn && (
            <>
              <ActionIcon
                color={dark ? "yellow" : "blue"}
                component={NextLink}
                href="/myrecipes"
                size="lg"
                title="My Recipes"
              >
                {/* <Indicator label={<Text size="xs">{numRecipes}</Text>} size={16}> */}
                <ThemeIcon variant="outline">
                  <BookmarkIcon width={24} />
                </ThemeIcon>
                {/* </Indicator> */}
              </ActionIcon>
              <ActionIcon size="lg" href="/groceries" component={NextLink}>
                <ThemeIcon variant="outline">
                  <CakeIcon width={22} />
                </ThemeIcon>
              </ActionIcon>
            </>
          )}

          <SignInOrUserProfile dark={dark} isSignedIn={isSignedIn} />
        </Group>
      </Center>
    </>
  );
};
