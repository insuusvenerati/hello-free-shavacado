import { SignInButton, UserButton, useUser } from "@clerk/nextjs";
import { BookmarkIcon, CakeIcon, CogIcon, HomeIcon, LoginIcon } from "@heroicons/react/outline";
import {
  Box,
  Button,
  createStyles,
  MantineGradient,
  Navbar,
  NavLink,
  SegmentedControl,
  SegmentedControlItem,
  Text,
  useMantineColorScheme,
} from "@mantine/core";
import Link from "next/link";
import { useRouter } from "next/router";
import { useMemo } from "react";
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

const SignInOrUserProfile = ({
  isSignedIn,
  dark,
}: {
  isSignedIn: boolean | undefined;
  dark: boolean;
}) => {
  if (!isSignedIn) {
    return (
      <NavLink
        sx={{ whiteSpace: "nowrap" }}
        icon={<LoginIcon color={dark ? "yellow" : "black"} width={16} />}
        label="Account"
      >
        <SignInButton mode="modal">
          <Button
            leftIcon={<LoginIcon width={16} />}
            variant="gradient"
            gradient={{ from: "indigo", to: "cyan" }}
            fullWidth
            mt="sm"
          >
            Sign In
          </Button>
        </SignInButton>
      </NavLink>
    );
  }
  return (
    <NavLink
      sx={{ whiteSpace: "nowrap" }}
      icon={<LoginIcon color={dark ? "yellow" : "black"} width={16} />}
      label="Account"
    >
      <UserButton showName />
    </NavLink>
  );
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
  const buttonGradient: MantineGradient = {
    from: dark ? "orange" : "indigo",
    to: dark ? "red" : "cyan",
  };

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
        <Box mt="sm">
          {links}
          <SignInOrUserProfile dark={dark} isSignedIn={isSignedIn} />
          <NavLink icon={<CogIcon width={16} />} label="Settings">
            <Button
              mt="sm"
              leftIcon={dark ? <MoonIcon /> : <SunIcon />}
              variant="gradient"
              gradient={buttonGradient}
              fullWidth
              onClick={() => toggleColorScheme()}
            >
              Theme
            </Button>
          </NavLink>
        </Box>
      </Navbar.Section>
      <Navbar.Section className={classes.footer}>
        <Text className={classes.title}>{user?.primaryEmailAddress?.emailAddress}</Text>
      </Navbar.Section>
    </>
  );
};
