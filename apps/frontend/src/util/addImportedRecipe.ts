import { ImportedRecipe } from "../types/importedRecipe";
import { SignInProps } from "@clerk/types";
import { HF_IMPORTED_RECIPE_URL } from "./constants";

type Props = {
  url: string;
  user: string;
  openSignIn: (signInProps?: SignInProps) => void;
};

export const addImportedRecipe = async ({ url, user, openSignIn }: Props) => {
  if (!user) {
    openSignIn({});
  }
  const response = await fetch(`${HF_IMPORTED_RECIPE_URL}?url=${url}&user=${user}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error(`Unable to add recipe url: ${url}`);
  }
  const data = (await response.json()) as ImportedRecipe;
  return data;
};
