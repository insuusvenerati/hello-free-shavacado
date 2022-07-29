import { createStyles, Drawer, DrawerProps } from "@mantine/core";
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
  return (
    <Drawer classNames={{ closeButton: classes.closeButton }} {...props}>
      {props.children}
    </Drawer>
  );
};
export default NavDrawer;
