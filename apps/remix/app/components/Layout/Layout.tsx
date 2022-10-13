import type { ReactNode } from "react";
import { MyAppShell } from "../MyAppShell";
import { Transition as FramerTransition } from "../Transition";

export const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <MyAppShell>
      <FramerTransition>{children}</FramerTransition>
    </MyAppShell>
  );
};
