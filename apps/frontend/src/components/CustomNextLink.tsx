import { createStyles } from "@mantine/core";
import type { NextLinkProps } from "@mantine/next/lib/NextLink";
import Link from "next/link";

type Props = NextLinkProps & {
  children: JSX.Element | JSX.Element[];
};

const useStyles = createStyles((theme) => ({
  link: {
    color: theme.colorScheme === "light" ? theme.primaryColor : "white",
  },
}));

export const CustomNextLink = ({ children, ...props }: Props) => {
  const { classes } = useStyles();
  return (
    <Link className={classes.link} {...props}>
      {children}
    </Link>
  );
};
