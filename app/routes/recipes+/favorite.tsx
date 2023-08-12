import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { redirect, type ActionArgs, type LoaderArgs } from "@remix-run/server-runtime";
import { typedjson } from "remix-typedjson";
import invariant from "tiny-invariant";
import { prisma } from "~/db.server";
import { addFavorite } from "~/models/recipe.server";
import { requireUser } from "~/session.server";

export const loader = async ({ request }: LoaderArgs) => {
  if (request.method !== "POST") return redirect("/", { status: 405, headers: { Allow: "POST" } });
};

export const action = async ({ request }: ActionArgs) => {
  const method = request.method;
  const user = await requireUser(request);
  const formData = await request.formData();
  const id = formData.get("id");
  const name = formData.get("name");

  invariant(typeof id === "string", "Missing id");
  invariant(typeof name === "string", "Missing name");

  try {
    if (method === "DELETE") {
      const result = await prisma.favoriteRecipe.delete({
        where: {
          recipeId: id,
        },
      });
      return typedjson({ result, ok: "true", method });
    }

    const result = await addFavorite(user, id);

    return typedjson({ result, ok: "true", method });
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      return typedjson({ result: error.message, ok: "false", method });
    }
    return typedjson({ result: JSON.stringify(error), ok: "false", method });
  }
};
