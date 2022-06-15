import { ActiveSessionResource, SignInProps } from "@clerk/types";
import ky from "ky";
import { Grocery } from "../types/grocery";
import { API_URL } from "./constants";

export const addGrocery = async (
  session: ActiveSessionResource,
  grocery: Grocery,
  openSignIn: (signInProps?: SignInProps) => void,
) => {
  if (!session) {
    openSignIn({});
  }

  return await ky
    .post(`${API_URL}/groceries?user=${session.user.id}`, {
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(grocery),
    })
    .json<Grocery>();
};
