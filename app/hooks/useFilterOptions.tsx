import type { Location } from "@remix-run/react";
import { useLocation } from "@remix-run/react";

export const useFilterOptions = (
  type: string,
  filter: string,
  direction: string | undefined = "desc",
) => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  searchParams.set(type, filter);
  searchParams.set("direction", direction);

  return `?${searchParams.toString()}`;
};

export const getFilterOptions = (
  type: string,
  filter: string,
  location: Location,
  direction: string | undefined = "desc",
) => {
  const searchParams = new URLSearchParams(location.search);

  searchParams.set(type, filter);
  searchParams.set("direction", direction);

  return `?${searchParams.toString()}`;
};
