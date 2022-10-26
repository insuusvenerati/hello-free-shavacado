import { Burger, createStyles, Group, Header, Image, MediaQuery, Title } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { useCallback } from "react";
import { SearchBox } from "react-instantsearch-hooks-web";
import { ButtonToggle } from "./Buttons/ColorSchemeToggle";
import { NextLink } from "@mantine/next";
import Link from "next/link";

type Props = {
  opened: boolean;
  setOpened: (opened: boolean) => void;
};

const useStyles = createStyles((theme) => ({
  header: {
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
  },

  inner: {
    height: 56,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  link: {
    display: "flex",
    gap: 10,
    alignItems: "center",
    lineHeight: 1,
    padding: "4px 6px",
    borderRadius: theme.radius.sm,
    textDecoration: "none",
    color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    "&:hover": {
      backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.gray[0],
    },
  },
}));

export const MyHeader = ({ opened, setOpened }: Props) => {
  const matches = useMediaQuery("(min-width: 900px)", true);
  const { classes } = useStyles();

  const handleDrawer = useCallback(() => {
    setOpened(!opened);
  }, [opened, setOpened]);

  return !matches ? (
    <MediaQuery largerThan="sm" styles={{ display: "none" }}>
      <Header height={70}>
        <Group style={{ height: 70 }} position="center">
          <Burger mr="sm" onClick={handleDrawer} opened={opened} size="md" />
          <Link href="/">
            <Image alt="logo" src="/OrangeSlice2.svg" width={50} height={50} />
          </Link>
          <SearchBox style={{ maxWidth: 250 }} role="search" />
        </Group>
      </Header>
    </MediaQuery>
  ) : (
    <Header mb={120} className={classes.header} height={56}>
      <div className={classes.inner}>
        <Group>
          <Burger mr="sm" onClick={handleDrawer} opened={opened} size="md" />
          <Link className={classes.link} href="/">
            <Image alt="logo" src="/OrangeSlice2.svg" width={45} height={45} />
            <Title order={2}>Hellofresh Search</Title>
          </Link>
        </Group>

        <Group>
          <Group ml={50} spacing={5}>
            <ButtonToggle />
          </Group>

          <SearchBox />

          {/* <Search /> */}
        </Group>
      </div>
    </Header>
  );
};
