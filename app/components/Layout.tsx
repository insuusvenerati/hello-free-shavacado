import { NavLink } from "@remix-run/react";
import { FilePlus, Home, Import, Settings, Star } from "lucide-react";
import type { ReactNode } from "react";
import { Navbar } from "./Navbar";

export const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Navbar />
      {children}
      <div className="h-18 btm-nav fixed bottom-0 items-start overflow-hidden lg:hidden">
        <NavLink className="h-3/4" to="/">
          {({ isActive }) => <Home className={isActive ? "h-3/4 fill-cyan-300" : "h-3/4"} />}
        </NavLink>

        <NavLink className="h-3/4" to="/user/favorites">
          {({ isActive }) => <Star className={isActive ? "h-3/4 fill-cyan-300" : "h-3/4"} />}
        </NavLink>

        <NavLink className="h-3/4" to="/user/imported">
          {({ isActive }) => <Import className={isActive ? "h-3/4 fill-cyan-300" : "h-3/4"} />}
        </NavLink>

        <NavLink className="h-3/4" to="/user/created">
          {({ isActive }) => <FilePlus className={isActive ? "h-3/4 fill-cyan-300" : "h-3/4"} />}
        </NavLink>

        <NavLink className="h-3/4" to="/user/settings">
          {({ isActive }) => <Settings className={isActive ? "h-3/4 fill-cyan-300" : "h-3/4"} />}
        </NavLink>
      </div>
    </>
  );
};
