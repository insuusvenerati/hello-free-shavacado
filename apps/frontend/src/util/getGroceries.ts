import ky from "ky";
import { Grocery } from "../types/grocery";
import { API_URL } from "./constants";

type Props = {
  userId: string | null | undefined;
  take: string;
  skip?: number;
};

export const getGroceries = async ({ userId, take, skip }: Props) => {
  if (!userId) {
    return await Promise.reject(new Error("Missing User ID"));
  }
  if (!skip) {
    return await ky.get(`${API_URL}/groceries?user=${userId}&take=${take}`).json<Grocery[]>();
  }
  return await ky
    .get(`${API_URL}/groceries?user=${userId}&take=${take}&skip=${skip}`)
    .json<Grocery[]>();
};
