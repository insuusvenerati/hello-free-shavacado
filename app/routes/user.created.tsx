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
        <div className="hidden h-full min-h-screen w-80 bg-secondary-focus lg:flex lg:flex-col">
          <Link className="link block p-4 text-xl" to="new">
            Add New
          </Link>

          <hr />

          <ol>
            {data.result.map((recipe) => (
              <li className="max-w-sm bg-secondary p-3 shadow-md sm:py-4" key={recipe.id}>
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <RemixImage
                      className="h-12 w-12 rounded-full"
                      src={recipe.imageUrl ?? "https://via.placeholder.com/50"}
                      alt={recipe.name}
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium"> {recipe.name} </p>
                    <p className="truncate text-ellipsis text-sm text-gray-500">
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
