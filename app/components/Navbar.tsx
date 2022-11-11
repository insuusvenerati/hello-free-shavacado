import { useMediaQuery } from "@mantine/hooks";
import type { User } from "@prisma/client";
import { Link, useFetcher } from "@remix-run/react";
import { ColorSchemeSwitcher } from "~/routes/resource/set-theme";
import { useMatchesData } from "~/utils";
import { Autocomplete } from "./AutoComplete";

const Bars = ({ ...props }: React.SVGProps<SVGSVGElement>) => (
  <label htmlFor="my-drawer-2">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-6 h-6 mr-4 lg:hidden"
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
      />
    </svg>
  </label>
);

export const Navbar = () => {
  const matchesData = useMatchesData<{ user: User }>("root");
  const matches = useMediaQuery("(min-width: 900px)");
  const fetcher = useFetcher();

  return (
    <nav className="navbar border-b-2 border-b-primary">
      {matches && (
        <div className="navbar-start">
          <Link to="/" className="btn-ghost btn text-xl normal-case">
            Hello Free Shavacado
          </Link>
        </div>
      )}

      {/* <Bars /> */}

      <div className="navbar-center">
        <Autocomplete placeholder="Search" />
      </div>
      <div className="navbar-end w-full gap-2">
        {matches ? <ColorSchemeSwitcher /> : null}
        {matchesData?.user ? (
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
