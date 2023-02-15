import { useMediaQuery } from "@mantine/hooks";
import type { User } from "@prisma/client";
import { Link, useFetcher } from "@remix-run/react";
import { useMatchesData } from "~/utils";
import { ColorSchemeSwitcher } from "./ColorSchemeSwitcher";
import { SearchForm } from "./SearchForm";

export const Navbar = () => {
  const matchesData = useMatchesData<{ user: User }>("root");
  const matches = useMediaQuery("(min-width: 900px)");
  const fetcher = useFetcher();

  return (
    <nav className="navbar justify-between border-b-2 border-b-primary">
      {matches && (
        <div className="navbar-start max-w-sm">
          <Link to="/" className="btn-ghost btn text-xl normal-case">
            Hello Free Shavacado
          </Link>
        </div>
      )}

      <div className="navbar-center w-full max-w-md">
        <SearchForm placeholder="Search" className="input input-bordered w-full" />
      </div>
      <div className="navbar-end max-w-sm gap-2">
        {matches ? <ColorSchemeSwitcher /> : null}
        {matches && matchesData?.user ? (
          <div className="dropdown-end dropdown">
            <button type="button" className="btn-ghost btn-circle avatar btn">
              <img
                className="w-10 rounded-full"
                alt="placeholder"
                src="https://placeimg.com/80/80/people"
              />
            </button>
            <ul
              role="menu"
              id="menu"
              className="dropdown-content menu rounded-box menu-compact mt-3 w-52 bg-base-300 p-2 shadow"
            >
              <li>
                <Link role="menuitem" to="/user/favorites">
                  Favorites
                </Link>
              </li>
              <li>
                <Link role="menuitem" to="/user/imported">
                  Imported
                </Link>
              </li>
              {/* <li>
                <a>Settings</a>
              </li> */}
              <li>
                <Link
                  role="menuitem"
                  onClick={() => fetcher.submit({}, { method: "post", action: "/logout" })}
                  to="/logout"
                >
                  Logout
                </Link>
              </li>
              <li>
                <Link role="menuitem" to="/user/settings">
                  Settings
                </Link>
              </li>
            </ul>
          </div>
        ) : (
          matches && (
            <Link to="/login" className="btn-ghost btn">
              Login
            </Link>
          )
        )}
      </div>
    </nav>
  );
};
