import type { LoaderArgs } from "@remix-run/server-runtime";
import { defer } from "@remix-run/server-runtime";
import { typedjson } from "remix-typedjson";
import { getWeather } from "~/models/weather.server";

export const loader = async ({ request }: LoaderArgs) => {
  const url = new URL(request.url);
  const lat = url.searchParams.get("lat");
  const lon = url.searchParams.get("lon");

  if (!lat || !lon) {
    return typedjson("Missing lat or lon", {
      status: 200,
    });
  }

  const data = getWeather(lat, lon);
  return defer({ data });
};
