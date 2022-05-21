import ky from "ky";
import { PLACEHOLDER_URL } from "./constants";

/**
 * Takes an image URL and returns a base64 placeholder
 * @param url Image url
 */
export const getPlaceholder = async (url: string) => {
  return await ky.get(`${PLACEHOLDER_URL}?src=${url}`).json<{ base64: string }>();
};
