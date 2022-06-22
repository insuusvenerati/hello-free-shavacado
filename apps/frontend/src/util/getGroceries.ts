import { ActiveSessionResource } from "@clerk/types";
import ky from "ky";
import { Grocery } from "../types/grocery";
import { API_URL } from "./constants";

export const getGroceries = async (session: ActiveSessionResource) => {
  const user = session?.user?.id;
  return await ky.get(`${API_URL}/groceries?user=${user}`).json<Grocery[]>();
};
