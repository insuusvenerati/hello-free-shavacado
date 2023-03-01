import type { Location } from "@remix-run/react";
import { useLocation } from "@remix-run/react";

export const useFilterOptions = (type: string, filter: string) => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  searchParams.set(type, filter);

  return `?${searchParams.toString()}`;
};

export const getFilterOptions = (type: string, filter: string, location: Location) => {
  const searchParams = new URLSearchParams(location.search);

  searchParams.set(type, filter);

  return `?${searchParams.toString()}`;
};
