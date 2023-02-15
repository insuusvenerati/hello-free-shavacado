import type { LoaderArgs } from "@remix-run/server-runtime";
import { sharpTransformer } from "remix-image-sharp";
import { imageLoader, MemoryCache } from "remix-image/server";

const config = {
  selfUrl: "http://localhost:3000",
  cache: new MemoryCache(),
  transformer: sharpTransformer,
};

export const loader = ({ request }: LoaderArgs) => {
  return imageLoader(config, request);
};
