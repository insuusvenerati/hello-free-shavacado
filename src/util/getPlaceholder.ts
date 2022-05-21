import ky from "ky";
import { Item } from "../types/recipes";
import { PLACEHOLDER_URL } from "./constants";

/**
 * Takes an image URL and returns a base64 placeholder
 * @param url Image url
 */
export const getPlaceholder = async (recipe: Item) => {
  const data = await ky
    .get(`${PLACEHOLDER_URL}?src=${`https://img.hellofresh.com/hellofresh_s3${recipe?.imagePath}`}`)
    .json<{ base64: string }>();

  return data.base64;
};
