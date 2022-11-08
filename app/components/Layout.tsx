import { Form, NavLink, useMatches } from "@remix-run/react";
import type { ReactNode } from "react";
import { Navbar } from "./Navbar";
import { RatingMenu } from "./RatingMenu";
import { RefinementList } from "./RefinementList";

export const Layout = ({ children }: { children: ReactNode }) => {
  const matches = useMatches();
  const isHome = matches.every((match) => match.pathname === "/");

  return (
    <>
      <Navbar />

      <div className="drawer-mobile drawer h-auto bg-black">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content mt-20 mb-10 sm:mb-0">
          <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">
            Open drawer
          </label>
          <div className="lg:mx-2 lg:ml-[17%]">{children}</div>
          <div className="btm-nav lg:hidden">
            <NavLink to="/">
              <button className="flex basis-full flex-col items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
                <span className="btm-nav-label">Home</span>
              </button>
            </NavLink>
            <NavLink to="/favorites">
              <button className="flex basis-full flex-col items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span className="btm-nav-label">Favorites</span>
              </button>
            </NavLink>
            <NavLink to="/imported">
              <button className="flex basis-full flex-col items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
                <span className="btm-nav-label">Imported</span>
              </button>
            </NavLink>
          </div>
        </div>
        {isHome && (
          <div className="drawer-side h-screen static lg:fixed">
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label id="my-drawer-2" htmlFor="my-drawer-2" className="drawer-overlay" />
            <div className="grid w-80 auto-rows-max gap-10 p-10 mt-10 bg-base-100">
              <Form method="post" action="/recipes/imported">
                <label htmlFor="url">Import Recipe</label>
                <input
                  placeholder="https://allrecipes.com/recipe/12345"
                  type="text"
                  className="input"
                  name="url"
                />
              </Form>
              <RatingMenu />
              <RefinementList
                showMoreLimit={50}
                showMore
                attribute="allergens.name"
                operator="and"
              />
              <RefinementList
                showMoreLimit={50}
                showMore
                attribute="ingredients.name"
                operator="and"
              />
              <RefinementList showMoreLimit={50} showMore attribute="tags.name" operator="and" />
            </div>
          </div>
        )}
      </div>
    </>
  );
};
