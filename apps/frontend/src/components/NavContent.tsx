import { SignInButton, UserButton, useUser } from "@clerk/nextjs";
import { BookmarkIcon, CakeIcon, HomeIcon, LoginIcon } from "@heroicons/react/outline";
import {
  ActionIcon,
  Box,
  Center,
  createStyles,
  Group,
  MantineStyleSystemProps,
  Navbar,
  NavLink,
  SegmentedControl,
  SegmentedControlItem,
  Text,
  ThemeIcon,
  useMantineColorScheme,
} from "@mantine/core";
import { NextLink } from "@mantine/next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useMemo, useState } from "react";
import { Github } from "./Icons/Github";
import { MoonIcon } from "./Icons/MoonIcon";
import { SunIcon } from "./Icons/SunIcon";

const useStyles = createStyles((theme, _params, getRef) => {
  const icon = getRef("icon");

  return {
    navbar: {
      backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
    },
    header: {
      paddingBottom: theme.spacing.md,
      marginBottom: theme.spacing.md * 1.5,
      borderBottom: `1px solid ${
        theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[2]
      }`,
    },

    title: {
      textTransform: "uppercase",
      letterSpacing: -0.25,
      whiteSpace: "nowrap",
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
      marginTop: theme.spacing.md,
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
  section?: "nav" | "filters";
  setSection?: (value: "nav" | "filters") => void;
  showSegmentedControl?: boolean;
};

const navLinks = [
  { href: "/", label: "Home", icon: HomeIcon },
  { href: "/myrecipes", label: "My Recipes", icon: BookmarkIcon },
  { href: "/groceries", label: "Groceries", icon: CakeIcon },
];

export const NavbarContent = ({
  section,
  setSection,
  showSegmentedControl = false,
}: NavbarContentProps) => {
  const { classes } = useStyles();
  const router = useRouter();
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

  const links = useMemo(
    () =>
      navLinks.map((link) => (
        <Link key={link.label} href={link.href} passHref>
          <NavLink
            sx={{ whiteSpace: "nowrap" }}
            label={link.label}
            icon={<link.icon width={16} />}
            component="a"
            active={router.pathname === link.href}
          />
        </Link>
      )),
    [router.pathname],
  );

  const handleSectionChange = (value: "nav" | "filters") => {
    if (setSection) {
      setSection(value);
    }
  };

  return (
    <>
      <Navbar.Section>
        {showSegmentedControl && (
          <SegmentedControl
            fullWidth={true}
            value={section}
            onChange={handleSectionChange}
            data={sectionControlData}
          />
        )}
      </Navbar.Section>
      <Navbar.Section className={classes.header}>
        <Box mt="sm">{links}</Box>
      </Navbar.Section>
      <Navbar.Section className={classes.footer}>
        <Text className={classes.title}>{user?.primaryEmailAddress?.emailAddress}</Text>
      </Navbar.Section>

      {/* <Group mt="sm">
        <NextLink color={dark ? "yellow" : "blue"} href="/" title="Home">
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
        </NextLink>
        {isSignedIn && (
          <>
            <NextLink color={dark ? "yellow" : "blue"} href="/myrecipes" title="My Recipes">
              <BookmarkIcon className={classes.linkIcon} width={24} />
            </NextLink>
            <NextLink href="/groceries">
              <CakeIcon className={classes.linkIcon} width={24} />
            </NextLink>
          </>
        )}

        <SignInOrUserProfile dark={dark} isSignedIn={isSignedIn} />
      </Group> */}
    </>
  );
};
