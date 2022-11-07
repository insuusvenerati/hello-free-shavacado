import { useMediaQuery } from "@mantine/hooks";
import type { User } from "@prisma/client";
import { Link, useFetcher } from "@remix-run/react";
import { useMatchesData } from "~/utils";
import { Autocomplete } from "./AutoComplete";

export const Navbar = () => {
  const matchesData = useMatchesData<{ user: User }>("root");
  const matches = useMediaQuery("(min-width: 900px)");
  const fetcher = useFetcher();

  return (
    <nav className="top-o navbar fixed z-50 border-b-2 border-b-primary bg-base-300">
      {matches && (
        <div className="navbar-start">
          <Link to="/" className="btn-ghost btn text-xl normal-case">
            Hello Free Shavacado
          </Link>
        </div>
      )}

      <div className="navbar-center">
        <Autocomplete placeholder="Search" />
      </div>
      <div className="navbar-end w-full">
        {matchesData?.user ? (
          <div className="dropdown-end dropdown">
            <button className="btn-ghost btn-circle avatar btn">
              <img
                className="w-10 rounded-full"
                alt="placeholder"
                src="https://placeimg.com/80/80/people"
              />
            </button>
            <ul
              role="menu"
              id="menu"
              className="dropdown-content menu rounded-box menu-compact mt-3 w-52 bg-base-100 p-2 shadow"
            >
              <li>
                <Link role="menuitem" to="/favorites">
                  Favorites
                </Link>
              </li>
              <li>
                <Link role="menuitem" to="/imported">
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
            </ul>
          </div>
        ) : (
          <Link to="/login" className="btn-ghost btn">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};
