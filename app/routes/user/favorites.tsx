import { useMediaQuery } from "@mantine/hooks";
import type { LoaderArgs } from "@remix-run/server-runtime";
import { typedjson, useTypedLoaderData } from "remix-typedjson";
import { Container } from "~/components/common/Container";
import { RecipeGrid } from "~/components/common/RecipeGrid";
import { GridSizeSelect } from "~/components/GridSizeSelect";
import { RecipeCard } from "~/components/RecipeCard";
import { getUserFavorites } from "~/db/getUserFavorites.server";
import { requireUser } from "~/session.server";

export const loader = async ({ request }: LoaderArgs) => {
  const user = await requireUser(request);
  const favoriteRecipes = await getUserFavorites(user.id);

  return typedjson({ favoriteRecipes });
};

const UserFavoritesPage = () => {
  const matches = useMediaQuery("(min-width: 768px)", true, { getInitialValueInEffect: false });
  const { favoriteRecipes } = useTypedLoaderData<typeof loader>();
  const count = favoriteRecipes.length;

  return (
    <Container>
      <div className="flex gap-4 mb-4">
        <div className="text-xl mb-5">
          You currently have <strong> {count} </strong> favorite recipes!
        </div>

        {matches && <GridSizeSelect />}
      </div>
      <RecipeGrid>
        {favoriteRecipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe.recipe} />
        ))}
      </RecipeGrid>
    </Container>
  );
};

export default UserFavoritesPage;
