import { ActiveSessionResource } from "@clerk/types";
import { API_URL } from "./constants";

export const deleteRecipe = async (session: ActiveSessionResource, id: string) => {
  if (!session) {
    throw new Error("No session available. Are you logged in?");
  }

  if (!id) {
    throw new Error("No recipe was given O.o");
  }

  const response = await fetch(`${API_URL}/recipe/${id}`, {
    method: "DELETE",
  });
  const data = await response.json();

  return { data };
};
