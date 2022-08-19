import { Burger, createStyles, Grid, Group, Header, MediaQuery, Title } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import Image from "next/image";
import { useCallback } from "react";
import { SearchBox } from "react-instantsearch-hooks-web";
import { ButtonToggle } from "./Buttons/ColorSchemeToggle";

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

  links: {
    [theme.fn.smallerThan("md")]: {
      display: "none",
    },
  },

  search: {
    [theme.fn.smallerThan("xs")]: {
      display: "none",
    },
  },

  link: {
    display: "block",
    lineHeight: 1,
    padding: "8px 12px",
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
      <Header height={70} p="md">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            height: "100%",
          }}
        >
          <Burger mr="sm" onClick={handleDrawer} opened={opened} size="md" />
          <Image alt="logo" src="/android-chrome-192x192.png" width={50} height={50} />
          <Grid justify="center">
            <Grid.Col lg={6} md={12}>
              <SearchBox />
            </Grid.Col>
          </Grid>
        </div>
      </Header>
    </MediaQuery>
  ) : (
    <Header mb={120} className={classes.header} height={56}>
      <div className={classes.inner}>
        <Group>
          <Burger mr="sm" onClick={handleDrawer} opened={opened} size="md" />
          <Image alt="logo" src="/android-chrome-192x192.png" width={50} height={50} />
          <Title order={2}>Hellofresh Search</Title>
        </Group>

        <Group>
          <Group ml={50} spacing={5} className={classes.links}>
            <ButtonToggle />
          </Group>

          <SearchBox />

          {/* <Search /> */}
        </Group>
      </div>
    </Header>
  );
};
