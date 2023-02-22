import type { ActionArgs } from "@remix-run/server-runtime";
import { typedjson } from "remix-typedjson";
import { prisma } from "~/db.server";
import { requireUser } from "~/session.server";

export const action = async ({ request }: ActionArgs) => {
  const user = await requireUser(request);
  const body = await request.formData();
  const options = Object.fromEntries(body.entries());

  const response = await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      ...options,
    },
  });
  return typedjson({ response });
};
