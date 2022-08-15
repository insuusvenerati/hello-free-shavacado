import { createStyles } from "@mantine/core";
import { NextLink } from "@mantine/next";
import type { NextLinkProps } from "@mantine/next/lib/NextLink";

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
    <NextLink className={classes.link} {...props}>
      {children}
    </NextLink>
  );
};
