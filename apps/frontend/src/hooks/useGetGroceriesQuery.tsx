import { useAuth } from "@clerk/nextjs";
import { useQuery } from "react-query";
import { getGroceries } from "../util/getGroceries";

export const useGetGroceriesQuery = () => {
  const { userId } = useAuth();
  return useQuery(["groceries", userId], () => getGroceries(userId), { enabled: !!userId });
};
