import type { LoaderArgs } from "@remix-run/server-runtime";
import { redirect } from "remix-typedjson";
import { ColorSchemeSwitcher } from "~/components/ColorSchemeSwitcher";
import { GridLayoutSwitcher } from "~/components/GridLayoutSwitcher";
import { RecipeGridSwitcher } from "~/components/RecipeGridSwitcher";
import { requireUser } from "~/session.server";

export const loader = async ({ request }: LoaderArgs) => {
  const user = requireUser(request);
  if (!user) {
    redirect("/login");
  }
  return null;
};

const SettingsPage = () => {
  return (
    <div className="flex h-screen flex-col items-center justify-start py-2">
      <main className="container mx-auto flex w-full flex-1 flex-col items-center justify-start gap-4 text-center">
        <h1 className="text-6xl font-bold">Settings</h1>

        <div className="flex items-center gap-4 text-xl font-bold">
          Theme: <ColorSchemeSwitcher />
        </div>
        <div className="flex items-center gap-4 text-xl font-bold">
          Recipe Grid Layout: <RecipeGridSwitcher />
        </div>
        <div className="flex items-center gap-4 text-xl font-bold">
          Recipe Page Layout: <GridLayoutSwitcher />
        </div>
      </main>
    </div>
  );
};

export default SettingsPage;
