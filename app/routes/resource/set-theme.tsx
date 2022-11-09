import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { useFetcher, useMatches } from "@remix-run/react";
import invariant from "tiny-invariant";
import { getThemeSession } from "~/models/theme.server";

export const action: ActionFunction = async ({ request }) => {
  const themeSession = await getThemeSession(request);
  const requestText = await request.text();
  const form = new URLSearchParams(requestText);
  const theme = form.get("theme");

  invariant(theme, "Theme is required");

  themeSession.setTheme(theme);
  return json({ success: true }, { headers: { "Set-Cookie": await themeSession.commit() } });
};

export const loader: LoaderFunction = () => redirect("/", { status: 404 });

export const ColorSchemeSwitcher = () => {
  const themeFetcher = useFetcher();
  const matches = useMatches().find((match) => match.id === "root")?.data;

  return (
    <select
      value={matches?.theme}
      className="select select-accent max-w-xs hidden lg:block"
      onChange={(value) =>
        themeFetcher.submit(
          { theme: value.currentTarget.value },
          { method: "post", action: "/resource/set-theme" },
        )
      }
    >
      <option value="cream">Cream 🍦</option>
      <option value="dark">Dark 🌑</option>
      <option value="light">Light ☀️</option>
      <option value="halloween">Halloween 👻</option>
    </select>
  );
};
