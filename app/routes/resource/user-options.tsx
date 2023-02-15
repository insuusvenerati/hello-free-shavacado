import type { ActionArgs } from "@remix-run/server-runtime";
import { typedjson } from "remix-typedjson";
import { prisma } from "~/db.server";
import { requireUser } from "~/session.server";

export const action = async ({ request }: ActionArgs) => {
  const user = await requireUser(request);
  const body = await request.formData();
  const gridSize = body.get("grid-size") as string | null;
  const recipePageLayout = body.get("recipe-page-layout") as string | null;

  const response = await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      gridSize: gridSize ?? null,
      recipePageLayout: recipePageLayout ?? null,
    },
  });
  return typedjson({ response });
};
