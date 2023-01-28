import type { LoaderArgs } from "@remix-run/server-runtime";
import { typedjson, useTypedLoaderData } from "remix-typedjson";
import { ImportedRecipeCard } from "~/components/ImportedRecipeCard";
import { prisma } from "~/db.server";
import { requireUser } from "~/session.server";

export const loader = async ({ params, request }: LoaderArgs) => {
  const user = await requireUser(request);
  const importedRecipes = await prisma.importedRecipe.findMany({
    where: { user: { id: user.id } },
  });
  if (!importedRecipes) return typedjson({ importedRecipes: [] });

  return typedjson({ importedRecipes });
};

const UserImportedPage = () => {
  const { importedRecipes } = useTypedLoaderData<typeof loader>();
  const count = importedRecipes.length;
  if (importedRecipes.length === 0)
    return <div className="text-xl mb-5">You currently have no imported recipes</div>;

  return (
    <>
      <div className="text-xl mb-5">
        You currently have <strong> {count} </strong> imported recipes!
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {importedRecipes.map((recipe) => (
          <ImportedRecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>
    </>
  );
};

export default UserImportedPage;
