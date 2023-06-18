import type { ActionArgs, LoaderFunction } from "@remix-run/node";
import { redirect, typedjson } from "remix-typedjson";
import invariant from "tiny-invariant";
import { updateUserColorScheme } from "~/db/getUserColorScheme.server";
import { getThemeSession } from "~/models/theme.server";
import { requireUser } from "~/session.server";

export const action = async ({ request }: ActionArgs) => {
  const user = await requireUser(request);
  const themeSession = await getThemeSession(request);
  const requestText = await request.text();
  const form = new URLSearchParams(requestText);
  const theme = form.get("theme");

  invariant(theme, "Theme is required");
  const response = await updateUserColorScheme({ colorScheme: theme, user });

  if (response) return typedjson(response);

  themeSession.setTheme(theme);
  return typedjson({ success: true }, { headers: { "Set-Cookie": await themeSession.commit() } });
};

export const loader: LoaderFunction = () => redirect("/");
