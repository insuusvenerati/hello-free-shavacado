import { useMediaQuery } from "@mantine/hooks";
import type { User } from "@prisma/client";
import type { LoaderArgs } from "@remix-run/server-runtime";
import { typedjson, useTypedLoaderData } from "remix-typedjson";
import { Container } from "~/components/common/Container";
import { RecipeGrid } from "~/components/common/RecipeGrid";
import { GridLayoutSwitcher } from "~/components/GridLayoutSwitcher";
import { GridSizeSelect } from "~/components/GridSizeSelect";
import { RecipeCard } from "~/components/RecipeCard";
import { RecipeListItem } from "~/components/RecipeListItem";
import { getUserFavorites } from "~/db/getUserFavorites.server";
import { requireUser } from "~/session.server";
import { cn, useMatchesData } from "~/utils";

export const loader = async ({ request }: LoaderArgs) => {
  const user = await requireUser(request);
  const favoriteRecipes = await getUserFavorites(user.id);

  return typedjson({ favoriteRecipes });
};

const UserFavoritesPage = () => {
  const matches = useMediaQuery("(min-width: 768px)", true, { getInitialValueInEffect: false });
  const { favoriteRecipes } = useTypedLoaderData<typeof loader>();
  const { user } = useMatchesData<{ user: User }>("root");
  const gridLayout = user?.gridLayout ?? "list";
  const selectorsStyles = cn("flex gap-4 mb-4", {
    "flex-col": !matches,
  });

  return (
    <Container className="container mx-auto mt-4">
      <div className={selectorsStyles}>
        <div className="flex flex-col items-start justify-center gap-1">
          Grid Size
          <GridSizeSelect />
        </div>
        <div className="flex flex-col items-start justify-center gap-1">
          Grid Layout
          <GridLayoutSwitcher />
        </div>
      </div>

      {gridLayout === "list" && (
        <ul className="flex flex-col flex-wrap gap-4 lg:max-h-96">
          {favoriteRecipes.map((recipe) => (
            <RecipeListItem key={recipe.id} recipe={recipe.recipe} />
          ))}
        </ul>
      )}

      {gridLayout === "grid" && (
        <RecipeGrid>
          {favoriteRecipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe.recipe} />
          ))}
        </RecipeGrid>
      )}
    </Container>
  );
};

export default UserFavoritesPage;