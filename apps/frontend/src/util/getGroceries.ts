import { ActiveSessionResource } from "@clerk/types";
import { Grocery } from "../types/grocery";
import { API_URL } from "./constants";

export const getGroceries = async (session: ActiveSessionResource): Promise<Grocery[]> => {
  const user = session?.user?.id;
  const response = await fetch(`${API_URL}/groceries?user=${user}`);
  if (!response.ok) {
    throw new Error(`Error adding grocery: ${response}`);
  }
  return await response.json();
};
