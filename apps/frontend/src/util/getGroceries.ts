import { Grocery } from "../types/grocery";
import { API_URL } from "./constants";

type Props = {
  userId: string | null | undefined;
  take: string;
  skip?: number;
};

export const getGroceries = async ({ userId, take, skip }: Props) => {
  if (!userId) {
    throw new Error("Missing User ID");
  }
  if (!skip) {
    const response = await fetch(`${API_URL}/groceries?user=${userId}&take=${take}`);
    return (await response.json()) as Grocery[];
  }
  const response = await fetch(`${API_URL}/groceries?user=${userId}&take=${take}&skip=${skip}`);
  return (await response.json()) as Grocery[];
};
