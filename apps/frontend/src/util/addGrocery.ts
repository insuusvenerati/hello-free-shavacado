import { SignInProps } from "@clerk/types";
import ky from "ky-universal";
import { AddGrocery, Grocery } from "../types/grocery";
import { API_URL } from "./constants";

export const addGrocery = async (
  userId: string | undefined | null,
  grocery: AddGrocery,
  openSignIn: (signInProps?: SignInProps) => void,
) => {
  if (!userId) {
    openSignIn({});
  }

  return await ky
    .post(`${API_URL}/groceries?user=${userId}`, {
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(grocery),
    })
    .json<Grocery>();
};
