import { getAuth } from "@clerk/remix/ssr.server";
import type { ActionArgs } from "@remix-run/node";
import { Response } from "@remix-run/node";
import { typedjson } from "remix-typedjson";
import { zx } from "zodix";
import importedrecipeServer, { createRecipeSchema } from "~/util/importedrecipe.server";

export const action = async ({ request }: ActionArgs) => {
  const { userId } = await getAuth(request);

  if (!userId) {
    return typedjson({ error: "Not signed in" }, { status: 401 });
  }

  const { url } = await zx.parseForm(request, createRecipeSchema);

  if (!url) {
    return typedjson({ error: "Invalid URL" }, { status: 400 });
  }

  const importedRecipe = await importedrecipeServer.create({ url, userId });

  if (importedRecipe instanceof Response) {
    return typedjson({ error: importedRecipe.statusText, status: importedRecipe.status });
  }

  return typedjson(importedRecipe, { status: 201 });
};
