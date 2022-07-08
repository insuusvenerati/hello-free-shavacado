import React from "react";

export type IconProps = React.ComponentPropsWithoutRef<"svg"> & {
  fill?: string;
  filled?: boolean;
  size?: number;
  height?: number;
  width?: number;
  label?: string;
};
