import { useMatches } from "@remix-run/react";
import type { ClassValue } from "clsx";
import clsx from "clsx";
import { useMemo } from "react";
import { toast } from "react-toastify";
import { twMerge } from "tailwind-merge";

import type { User } from "~/models/user.server";
import type { Item } from "./types/recipe";

const DEFAULT_REDIRECT = "/";

/**
 * This should be used any time the redirect path is user-provided
 * (Like the query string on our login/signup pages). This avoids
 * open-redirect vulnerabilities.
 * @param {string} to The redirect destination
 * @param {string} defaultRedirect The redirect to use if the to is unsafe.
 */
export function safeRedirect(
  to: FormDataEntryValue | string | null | undefined,
  defaultRedirect: string = DEFAULT_REDIRECT,
) {
  if (!to || typeof to !== "string") {
    return defaultRedirect;
  }

  if (!to.startsWith("/") || to.startsWith("//")) {
    return defaultRedirect;
  }

  return to;
}

export function useMatchesData<T = unknown>(id: string) {
  const matchingRoutes = useMatches();
  const route = useMemo(
    () => matchingRoutes.find((route) => route.id === id),
    [matchingRoutes, id],
  );
  return route?.data as T;
}

function isUser(user: any): user is User {
  return user && typeof user === "object" && typeof user.email === "string";
}

export function useOptionalUser(): User | undefined {
  const data = useMatchesData<{ user: User }>("root");
  if (!data || !isUser(data.user)) {
    return undefined;
  }
  return data.user;
}

export function useUser(): User {
  const maybeUser = useOptionalUser();
  if (!maybeUser) {
    throw new Error(
      "No user found in root loader, but user is required by useUser. If user is optional, try useOptionalUser instead.",
    );
  }
  return maybeUser;
}

export function validateEmail(email: unknown): email is string {
  return typeof email === "string" && email.length > 3 && email.includes("@");
}

export function debug(...args: unknown[]) {
  if (process.env.NODE_ENV === "development") {
    console.log(...args);
  }
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const urlToObject = async (url: string) => {
  const response = await fetch(url);
  const blob = await response.blob();
  const file = new File([blob], "image.jpg", { type: blob.type });
  return file;
};

export async function webShare({
  text,
  files: filesUrl,
  url,
  title,
}: {
  text: string;
  files?: string[];
  url?: string;
  title?: string;
}) {
  let files: File[] | undefined;

  if (navigator.share !== undefined) {
    if (filesUrl && filesUrl.length > 0) {
      const filesGetter = filesUrl.map((file) => urlToObject(file));
      const newFiles = await Promise.all(filesGetter);

      if (!navigator.canShare || !navigator.canShare({ files: newFiles })) {
        toast("Unsupported share feature", { theme: "dark" });
        return;
      }

      files = newFiles;
    }

    try {
      await navigator.share({ text, files, url, title });
    } catch (error) {
      toast(`Error sharing: ${error}`);
    }
  } else {
    const shareUrl = `${title}\n\n${text}\n\n${url}`;
    navigator.clipboard
      .writeText(shareUrl)
      .then(() => toast("Copied to clipboard", { theme: "dark" }))
      .catch(() => toast("Error copying to clipboard", { theme: "dark" }));
  }
}

export const filterRecipeResults = (recipes: Item[] = []): Promise<Item[]> => {
  return new Promise((resolve, reject) => {
    try {
      const filteredRecipes = recipes.filter(
        (recipe) => recipe.ingredients.length > 1 && recipe.steps.length > 1,
      );
      resolve(filteredRecipes);
    } catch (error) {
      reject(error);
    }
  });
};

export const isPromise = (value: any): value is Promise<any> => {
  return value && typeof value.then === "function";
};
