import { Link, Outlet } from "@remix-run/react";
import type { LoaderArgs } from "@remix-run/server-runtime";
import { Trash } from "lucide-react";
import { typedjson, useTypedLoaderData } from "remix-typedjson";
import { RemixImage } from "~/components/RemixImage";
import { getCreatedRecipes } from "~/models/recipe.server";

export const loader = async ({ request }: LoaderArgs) => {
  const response = await getCreatedRecipes(request);
  return typedjson(response);
};

const CreatedRecipesPage = () => {
  const data = useTypedLoaderData<typeof loader>();
  return (
    <div className="flex h-full min-h-screen flex-col">
      <main className="flex h-full min-h-screen">
        <div className="h-full w-80 bg-secondary-focus min-h-screen hidden lg:flex lg:flex-col">
          <Link className="block p-4 text-xl link" to="new">
            Add New
          </Link>

          <hr />

          <ol>
            {data.result.map((recipe) => (
              <li className="p-3 max-w-sm sm:py-4 shadow-md bg-secondary" key={recipe.id}>
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <RemixImage
                      className="w-12 h-12 rounded-full"
                      src={recipe.imageUrl ?? "https://via.placeholder.com/50"}
                      alt={recipe.name}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate"> {recipe.name} </p>
                    <p className="text-sm text-gray-500 truncate text-ellipsis">
                      {recipe.description}
                    </p>
                  </div>
                  <div className="inline-flex items-center text-base font-semibold">
                    <Trash />
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div className="flex-1 p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default CreatedRecipesPage;
