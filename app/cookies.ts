import { createCookie } from "@remix-run/node";

export const token = createCookie("token", {
  maxAge: 60 * 60 * 24 * 7, // 1 week
});
