import { createStyles, Drawer, DrawerProps, useMantineTheme } from "@mantine/core";
import { FC } from "react";

type Props = {
  children: JSX.Element[];
} & DrawerProps;

const useStyles = createStyles((theme) => ({
  closeButton: {
    color: theme.black,
    width: 44,
    height: 44,
    marginRight: 5,
    marginTop: 5,
    ["& svg"]: {
      width: 44,
      height: 44,
    },
  },
}));

const NavDrawer: FC<Props> = ({ ...props }) => {
  const { classes } = useStyles();
  const theme = useMantineTheme();
  return (
    <Drawer
      overlayColor={theme.colorScheme === "dark" ? theme.colors.dark[9] : theme.colors.gray[2]}
      overlayOpacity={0.55}
      overlayBlur={3}
      classNames={{ closeButton: classes.closeButton }}
      {...props}
    >
      {props.children}
    </Drawer>
  );
};
export default NavDrawer;
