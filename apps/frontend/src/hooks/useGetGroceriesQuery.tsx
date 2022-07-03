import { useAuth } from "@clerk/nextjs";
import { useQuery } from "react-query";
import { Groceries } from "../types/grocery";
import { getGroceries } from "../util/getGroceries";

export const useGetGroceriesQuery = () => {
  const { userId } = useAuth();
  return useQuery<Groceries, Error>(["groceries", userId], () => getGroceries(userId), {
    enabled: !!userId,
    placeholderData: { groceries: [], ingredientsGroup: [] },
  });
};
