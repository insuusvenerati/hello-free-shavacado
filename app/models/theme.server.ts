import { createCookieSessionStorage } from "@remix-run/node";
import invariant from "tiny-invariant";

const sessionSecret = process.env.SESSION_SECRET;
invariant(sessionSecret, "SESSION_SECRET must be set");

const themeStorage = createCookieSessionStorage({
  cookie: {
    name: "colorscheme",
    secure: true,
    secrets: [sessionSecret],
    sameSite: "lax",
    path: "/",
    httpOnly: true,
  },
});

async function getThemeSession(request: Request) {
  const session = await themeStorage.getSession(request.headers.get("Cookie"));
  return {
    getTheme: () => {
      return session.get("theme") as string;
    },
    setTheme: (theme: string) => session.set("theme", theme),
    commit: () => themeStorage.commitSession(session),
  };
}

export { getThemeSession };
