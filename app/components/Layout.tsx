import type { ReactNode } from "react";
import { navLinks } from "~/constants";
import { BottomNavItem } from "./BottomNavItem";
import { Navbar } from "./Navbar";

export const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Navbar />
      {children}
      <div className="h-18 btm-nav fixed bottom-0 items-start overflow-hidden lg:hidden">
        {navLinks.map((link) => (
          <BottomNavItem to={link.to} key={link.to} icon={link.icon} />
        ))}
      </div>
    </>
  );
};
