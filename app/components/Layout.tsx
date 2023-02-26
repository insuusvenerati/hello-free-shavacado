import { NavLink } from "@remix-run/react";
import { FilePlus, Home, Import, Settings, Star } from "lucide-react";
import type { ReactNode } from "react";
import { Navbar } from "./Navbar";

export const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Navbar />
      {children}
      <div className="btm-nav h-20 lg:hidden items-start fixed bottom-0 overflow-hidden">
        <NavLink className="h-3/4" to="/">
          {({ isActive }) => <Home className={isActive ? "fill-cyan-300 h-3/4" : "h-3/4"} />}
        </NavLink>

        <NavLink className="h-3/4" to="/user/favorites">
          {({ isActive }) => <Star className={isActive ? "fill-cyan-300 h-3/4" : "h-3/4"} />}
        </NavLink>

        <NavLink className="h-3/4" to="/user/imported">
          {({ isActive }) => <Import className={isActive ? "fill-cyan-300 h-3/4" : "h-3/4"} />}
        </NavLink>

        <NavLink className="h-3/4" to="/user/created">
          {({ isActive }) => <FilePlus className={isActive ? "fill-cyan-300 h-3/4" : "h-3/4"} />}
        </NavLink>

        <NavLink className="h-3/4" to="/user/settings">
          {({ isActive }) => <Settings className={isActive ? "fill-cyan-300 h-3/4" : "h-3/4"} />}
        </NavLink>
      </div>
    </>
  );
};
