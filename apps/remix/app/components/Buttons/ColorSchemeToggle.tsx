import {
  createStyles,
  UnstyledButton,
  Text,
  Center,
  useMantineColorScheme,
  Group,
} from "@mantine/core";
import { upperFirst } from "@mantine/hooks";
import { MoonIcon } from "../Icons/MoonIcon";
import { SunIcon } from "../Icons/SunIcon";

const useStyles = createStyles((theme) => ({
  control: {
    backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.colors.gray[0],
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 1000,
    paddingLeft: theme.spacing.sm,
    paddingRight: 4,
    width: 136,
    height: 36,
  },

  iconWrapper: {
    height: 28,
    width: 28,
    borderRadius: 28,
    backgroundColor: theme.colorScheme === "dark" ? theme.colors.yellow[4] : theme.colors.dark[4],
    color: theme.colorScheme === "dark" ? theme.black : theme.colors.blue[2],
  },

  value: {
    lineHeight: 1,
  },
}));

export function ButtonToggle() {
  const { classes } = useStyles();
  // eslint-disable-next-line @typescript-eslint/unbound-method
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const Icon = colorScheme === "dark" ? SunIcon : MoonIcon;

  return (
    <Group position="center" my="xl">
      <UnstyledButton
        aria-label="Toggle theme"
        className={classes.control}
        onClick={() => toggleColorScheme()}
        title="Ctrl + J"
      >
        <Text size="sm" className={classes.value}>
          {upperFirst(colorScheme === "light" ? "dark" : "light")} theme
        </Text>

        <Center className={classes.iconWrapper}>
          <Icon size={18} stroke="1.5" />
        </Center>
      </UnstyledButton>
    </Group>
  );
}
