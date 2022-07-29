import { SignInButton, UserButton, useUser } from "@clerk/nextjs";
import { BookmarkIcon, CakeIcon, HomeIcon, LoginIcon } from "@heroicons/react/outline";
import {
  ActionIcon,
  Center,
  createStyles,
  Group,
  MantineStyleSystemProps,
  SegmentedControl,
  SegmentedControlItem,
  Text,
  ThemeIcon,
  useMantineColorScheme,
} from "@mantine/core";
import { NextLink } from "@mantine/next";
import { useMemo } from "react";
import { Github } from "./Icons/Github";
import { MoonIcon } from "./Icons/MoonIcon";
import { SunIcon } from "./Icons/SunIcon";

const useStyles = createStyles(() => {
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

type NavbarContentProps = {
  marginTop?: MantineStyleSystemProps["mt"];
  section?: "nav" | "filters";
  setSection?: (value: "nav" | "filters") => void;
  showSegmentedControl?: boolean;
};

export const NavbarContent = ({
  marginTop = 0,
  section,
  setSection,
  showSegmentedControl = false,
}: NavbarContentProps) => {
  const { classes } = useStyles();
  // eslint-disable-next-line @typescript-eslint/unbound-method
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const { isSignedIn, user } = useUser();
  const dark = colorScheme === "dark";

  const sectionControlData: SegmentedControlItem[] = useMemo(
    () => [
      {
        label: "Navigation",
        value: "nav",
      },
      {
        label: "Filters",
        value: "filters",
      },
    ],
    [],
  );

  const handleSectionChange = (value: "nav" | "filters") => {
    if (setSection) {
      setSection(value);
    }
  };

  return (
    <>
      <Center>
        <Text weight={500} size="sm" className={classes.title} color="dimmed">
          {user?.primaryEmailAddress?.emailAddress}
        </Text>
      </Center>

      {showSegmentedControl && (
        <SegmentedControl
          fullWidth={true}
          value={section}
          onChange={handleSectionChange}
          data={sectionControlData}
        />
      )}
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
