import ky from "ky";

/**
 * Takes an image URL and returns a base64 placeholder
 * @param url Image url
 */
export const getPlaceholder = async (url: string) => {
  return await ky.get(`/api/placeholder?src=${url}`).json<{ base64: string }>();
};
