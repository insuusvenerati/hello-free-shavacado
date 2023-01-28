import { NavLink, Outlet } from "@remix-run/react";
import type { LoaderArgs } from "@remix-run/server-runtime";
import { typedjson, useTypedLoaderData } from "remix-typedjson";
import { requireUser } from "~/session.server";

export const loader = async ({ params, request }: LoaderArgs) => {
  const user = await requireUser(request);
  return typedjson(user);
};

const links = [
  { name: "Favorites", href: "/user/favorites" },
  { name: "Imported", href: "/user/imported" },
];

const UserPage = () => {
  const user = useTypedLoaderData<typeof loader>();

  return (
    <>
      <main className="container mx-auto p-1 lg:p-5">
        <h1 className="text-xl mb-5 lg:text-5xl">
          Hello <strong>{user.email}!</strong>
        </h1>
        <div className="tabs justify-center">
          <NavLink to="/user/favorites">
            {({ isActive }) => (
              <span className={`tab tab-lg tab-lifted ${isActive && "tab-active"}`}>Favorites</span>
            )}
          </NavLink>

          <NavLink to="/user/imported">
            {({ isActive }) => (
              <span className={`tab tab-lg tab-lifted ${isActive && "tab-active"}`}>Imported</span>
            )}
          </NavLink>
        </div>
        <Outlet />
      </main>
    </>
  );
};

export default UserPage;
