import { ActiveSessionResource, SignInProps } from "@clerk/types";
import { Grocery } from "../types/grocery";
import { API_URL } from "./constants";

export const addGrocery = async (
  session: ActiveSessionResource,
  grocery: Grocery,
  openSignIn: (signInProps?: SignInProps) => void,
): Promise<Grocery> => {
  if (!session) {
    openSignIn({});
    return;
  }
  const response = await fetch(`${API_URL}/groceries?user=${session.user.id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(grocery),
  });
  if (!response.ok) {
    throw new Error(`Error adding grocery: ${response}`);
  }

  return await response.json();
};
