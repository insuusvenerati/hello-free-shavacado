import { NavLink } from "@remix-run/react";
import type { LucideIcon } from "lucide-react";

export type BottomNavItemProps = {
  to: string;
  icon: LucideIcon;
};

export const BottomNavItem = ({ to, icon: Icon }: BottomNavItemProps) => {
  return (
    <NavLink className="h-3/4" to={to}>
      {({ isActive }) => <Icon className={isActive ? "h-3/4 fill-cyan-300" : "h-3/4"} />}
    </NavLink>
  );
};
