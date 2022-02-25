import { styled } from "@nextui-org/react";

export const StyledNavContainer = styled("nav", {
  top: 0,
  display: "flex",
  alignItems: "center",
  height: "76px",
  background: "transparent",
  variants: {
    showBlur: {
      true: {
        background: "$headerBackground",
        backdropFilter: "saturate(180%) blur(10px)",
      },
    },
    detached: {
      true: {
        boxShadow: "0px 5px 20px -5px rgba(2, 1, 1, 0.1)",
      },
    },
  },
});
