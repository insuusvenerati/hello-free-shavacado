/* eslint-disable jsx-a11y/anchor-has-content */
import { SignedIn, SignedOut, SignInButton, UserButton, useUser } from "@clerk/remix";
import { dark } from "@clerk/themes";
import {
  ArrowLeftOnRectangleIcon,
  BookmarkIcon,
  CakeIcon,
  CogIcon,
  HomeIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import type { MantineGradient, SegmentedControlItem } from "@mantine/core";
import {
  Box,
  Button,
  createStyles,
  Navbar,
  NavLink as MantineNavLink,
  SegmentedControl,
  Text,
  Transition,
  useMantineColorScheme,
} from "@mantine/core";
import { NavLink } from "@remix-run/react";
import { useMemo } from "react";
import { AddImportedRecipeForm } from "./AddImportedRecipeForm";
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

const SignInOrUserProfile = () => {
  const { colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === "dark";
  return (
    <>
      <SignedIn>
        <MantineNavLink
          sx={{ whiteSpace: "nowrap" }}
          icon={<ArrowLeftOnRectangleIcon color={isDark ? "yellow" : "black"} width={16} />}
          label="Account"
        >
          <UserButton
            appearance={{
              baseTheme: colorScheme === "dark" ? dark : undefined,
            }}
            showName
          />
        </MantineNavLink>
      </SignedIn>

      <SignedOut>
        <MantineNavLink
          sx={{ whiteSpace: "nowrap" }}
          icon={<ArrowLeftOnRectangleIcon color={dark ? "yellow" : "black"} width={16} />}
          label="Account"
        >
          <SignInButton mode="modal">
            <Button
              leftIcon={<ArrowLeftOnRectangleIcon width={16} />}
              variant="gradient"
              gradient={{ from: "indigo", to: "cyan" }}
              fullWidth
              mt="sm"
            >
              Sign In
            </Button>
          </SignInButton>
        </MantineNavLink>
      </SignedOut>
    </>
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
  { href: "/add", label: "Add a recipe", icon: PlusIcon },
];

export const NavbarContent = ({
  section,
  setSection,
  showSegmentedControl = false,
}: NavbarContentProps) => {
  const { classes } = useStyles();
  // const router = useRouter();
  // eslint-disable-next-line @typescript-eslint/unbound-method
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const { user } = useUser();
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
        <MantineNavLink
          component={NavLink}
          to={link.href}
          sx={{ whiteSpace: "nowrap" }}
          label={link.label}
          icon={<link.icon width={16} />}
          key={link.href}
        />
      )),
    [],
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
            mt="sm"
            mb="sm"
          />
        )}
      </Navbar.Section>
      <Transition
        mounted={section === "nav"}
        transition="slide-right"
        duration={200}
        timingFunction="ease"
      >
        {(styles) => (
          <>
            <Navbar.Section style={styles} className={classes.header}>
              <Box mt="sm">
                {links}
                <SignInOrUserProfile />
                <MantineNavLink icon={<CogIcon width={16} />} label="Settings">
                  <Button
                    mt="sm"
                    leftIcon={dark ? <MoonIcon /> : <SunIcon />}
                    variant="gradient"
                    gradient={buttonGradient}
                    fullWidth
                    onClick={() => toggleColorScheme(colorScheme === "dark" ? "light" : "dark")}
                  >
                    Theme
                  </Button>
                </MantineNavLink>
              </Box>
            </Navbar.Section>

            <AddImportedRecipeForm />

            <Navbar.Section className={classes.footer}>
              <Text className={classes.title}>{user?.primaryEmailAddress?.emailAddress}</Text>
            </Navbar.Section>
          </>
        )}
      </Transition>
    </>
  );
};
