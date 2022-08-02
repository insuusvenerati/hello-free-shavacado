import { SignInButton, UserButton, useUser } from "@clerk/nextjs";
import { BookmarkIcon, CakeIcon, HomeIcon, LoginIcon } from "@heroicons/react/outline";
import {
  ActionIcon,
  Box,
  Center,
  createStyles,
  MantineStyleSystemProps,
  SegmentedControl,
  SegmentedControlItem,
  Text,
  useMantineColorScheme,
} from "@mantine/core";
import { NextLink } from "@mantine/next";
import { forwardRef, useMemo, useState } from "react";
import { Github } from "./Icons/Github";

const useStyles = createStyles((theme, _params, getRef) => {
  const icon = getRef("icon");

  return {
    navbar: {
      backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
    },

    title: {
      textTransform: "uppercase",
      letterSpacing: -0.25,
    },

    link: {
      display: "flex",
      alignItems: "center",
      textDecoration: "none",
      fontSize: theme.fontSizes.sm,
      color: theme.colorScheme === "dark" ? theme.colors.dark[1] : theme.colors.gray[7],
      padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
      borderRadius: theme.radius.sm,
      fontWeight: 500,

      "&:hover": {
        backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.gray[0],
        color: theme.colorScheme === "dark" ? theme.white : theme.black,

        [`& .${icon}`]: {
          color: theme.colorScheme === "dark" ? theme.white : theme.black,
        },
      },
    },

    linkIcon: {
      ref: icon,
      color: theme.colorScheme === "dark" ? theme.colors.dark[2] : theme.colors.gray[6],
      marginRight: theme.spacing.sm,
      width: 24,
    },

    linkActive: {
      "&, &:hover": {
        backgroundColor: theme.fn.variant({ variant: "light", color: theme.primaryColor })
          .background,
        color: theme.fn.variant({ variant: "light", color: theme.primaryColor }).color,
        [`& .${icon}`]: {
          color: theme.fn.variant({ variant: "light", color: theme.primaryColor }).color,
        },
      },
    },

    footer: {
      borderTop: `1px solid ${
        theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
      }`,
      paddingTop: theme.spacing.md,
    },
  };
});

const SignInOrUserProfile = ({ isSignedIn, dark }) => {
  const { classes } = useStyles();
  if (!isSignedIn) {
    return (
      <SignInButton mode="modal">
        <ActionIcon color={dark ? "yellow" : "blue"}>
          <LoginIcon className={classes.linkIcon} width={24} />
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

const navLinks = [
  { href: "/", label: "Home", icon: HomeIcon },
  { href: "/myrecipes", label: "My Recipes", icon: BookmarkIcon },
  // { href: "/groceries", label: "Groceries", icon: CakeIcon },
  {
    href: "https://github.com/insuusvenerati/hello-free-shavacado",
    label: "Github",
    icon: Github,
  },
];

export const NavbarContent = ({
  marginTop = 0,
  section,
  setSection,
  showSegmentedControl = false,
}: NavbarContentProps) => {
  const { classes, cx } = useStyles();
  const [active, setActive] = useState("Home");
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

  const links = navLinks.map((link) => (
    <NextLink
      passHref
      href={link.href}
      key={link.label}
      // onClick={(event) => {
      //   event.preventDefault();
      //   setActive(link.label);
      // }}
      className={cx(classes.link, { [classes.linkActive]: link.label === active })}
    >
      <link.icon className={classes.linkIcon} />
      <span> {link.label} </span>
    </NextLink>
  ));

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
          mt="sm"
          fullWidth={true}
          value={section}
          onChange={handleSectionChange}
          data={sectionControlData}
        />
      )}
      <Box mt="sm">{links}</Box>
      {/* <Group> */}
      {/* <NextLink color={dark ? "yellow" : "blue"} href="/" title="Home">
            <ThemeIcon variant="outline">
              <HomeIcon width={24} />
            </ThemeIcon>
          </NextLink>
          <ActionIcon
            color={dark ? "yellow" : "blue"}
            // eslint-disable-next-line react/jsx-no-bind
            onClick={() => toggleColorScheme()}
            title="Toggle color scheme"
          >
            <ThemeIcon variant="outline">
              {dark ? <SunIcon size={24} /> : <MoonIcon size={24} />}
            </ThemeIcon>
          </ActionIcon>
          <NextLink
            color={dark ? "yellow" : "blue"}
            href="https://github.com/insuusvenerati/hello-free-shavacado"
            target="_blank"
            title="Github"
          >
            <ThemeIcon variant="outline">
              <Github width={22} />
            </ThemeIcon>
          </NextLink> */}
      {isSignedIn && (
        <>
          <NextLink color={dark ? "yellow" : "blue"} href="/myrecipes" title="My Recipes">
            {/* <Indicator label={<Text size="xs">{numRecipes}</Text>} size={16}> */}

            <BookmarkIcon className={classes.linkIcon} width={24} />

            {/* </Indicator> */}
          </NextLink>
          <NextLink href="/groceries">
            <CakeIcon className={classes.linkIcon} width={24} />
          </NextLink>
        </>
      )}

      <SignInOrUserProfile dark={dark} isSignedIn={isSignedIn} />
      {/* </Group> */}
    </>
  );
};
