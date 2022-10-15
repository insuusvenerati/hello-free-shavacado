import type { ReactNode } from "react";
import { MyAppShell } from "../MyAppShell";

export const Layout = ({ children }: { children: ReactNode }) => {
  return <MyAppShell>{children}</MyAppShell>;
};
