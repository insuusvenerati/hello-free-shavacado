import type { ActionArgs, LoaderFunction } from "@remix-run/node";
import { redirect, typedjson, useTypedFetcher } from "remix-typedjson";
import invariant from "tiny-invariant";
import { updateUserColorScheme } from "~/db/getUserColorScheme.server";
import { getThemeSession } from "~/models/theme.server";
import { requireUser } from "~/session.server";
import { useMatchesData } from "~/utils";

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

export const loader: LoaderFunction = () => redirect("/", { status: 404 });

export const ColorSchemeSwitcher = () => {
  const themeFetcher = useTypedFetcher<typeof action>();
  const matches = useMatchesData<{ colorScheme: string }>("root");

  return (
    <select
      value={matches?.colorScheme || "dark"}
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
