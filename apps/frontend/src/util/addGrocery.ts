import { SignInProps } from "@clerk/types";
import { AddGrocery, Grocery } from "../types/grocery";
import { API_URL } from "./constants";

export const addGrocery = async (
  userId: string | undefined | null,
  grocery: AddGrocery,
  openSignIn: (signInProps?: SignInProps) => void,
) => {
  if (typeof userId !== "string") {
    openSignIn({});
    throw new Error("Not signed in");
  }

  const response = await fetch(`${API_URL}/groceries?user=${userId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(grocery),
  });
  return (await response.json()) as Grocery;
};
