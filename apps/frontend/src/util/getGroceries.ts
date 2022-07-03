import ky from "ky";
import { Groceries } from "../types/grocery";
import { API_URL } from "./constants";

export const getGroceries = async (userId: string | null | undefined) => {
  if (!userId) {
    return await Promise.reject(new Error("Missing User ID"));
  }
  return await ky.get(`${API_URL}/groceries?user=${userId}`).json<Groceries>();
};
