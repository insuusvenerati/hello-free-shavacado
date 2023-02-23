import { NavLink } from "@remix-run/react";
import { FilePlus, Home, Import, Settings, Star } from "lucide-react";
import type { ReactNode } from "react";
import { Navbar } from "./Navbar";

export const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Navbar />
      {/* {matches && isHome ? (
        <Sidebar className="hidden max-h-full p-5 lg:grid absolute overflow-y-auto left-0 w-72 auto-rows-max gap-10" />
      ) : null} */}
      {children}
      <div className="btm-nav h-20 lg:hidden items-start fixed bottom-0 overflow-hidden">
        <NavLink className="h-3/4" to="/">
          <button title="Home" type="button">
            <Home />
          </button>
        </NavLink>

        <NavLink className="h-3/4" to="/user/favorites">
          <button title="Favorites" type="button">
            <Star />
          </button>
        </NavLink>

        <NavLink className="h-3/4" to="/user/imported">
          <button title="Imported" type="button">
            <Import />
          </button>
        </NavLink>

        <NavLink className="h-3/4" to="/user/created">
          <button title="Created" type="button">
            <FilePlus />
          </button>
        </NavLink>

        <NavLink className="h-3/4" to="/user/settings">
          <button title="Settings" type="button">
            <Settings />
          </button>
        </NavLink>
      </div>
    </>
  );
};
