import { createCookieSessionStorage } from "@remix-run/node";
import invariant from "tiny-invariant";
import { TOKEN_URL } from "./constants";

invariant(process.env.SESSION_SECRET, "SESSION_SECRET must be set");

type TokenResponse = {
  access_token: string;
};

export const tokenSessionStorage = createCookieSessionStorage({
  cookie: {
    name: "__token",
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    secrets: [process.env.SESSION_SECRET],
    secure: process.env.NODE_ENV === "production",
  },
});

export const getTokenSession = async (request: Request) => {
  const cookie = request.headers.get("Cookie");
  return tokenSessionStorage.getSession(cookie);
};

export const getSessionToken = async (request: Request) => {
  const session = await getTokenSession(request);
  if (!session.has("token")) {
    try {
      const tokenResponse = await fetch(TOKEN_URL, {
        method: "POST",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "X-Requested-With": "Stiforr",
        },
      });
      const token = (await tokenResponse.json()) as TokenResponse;
      session.set("token", token.access_token);
      return token.access_token;
    } catch (error) {
      if (error instanceof Error) {
        console.log("Failed to fetch token", error.message);
        return { error };
      }
      return { error: "Unknown error" };
    }
  }
  const access_token = session.get("token") as string;
  return access_token;
};
