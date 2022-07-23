import { useAuth } from "@clerk/nextjs";
import { useQuery } from "react-query";
import { Grocery } from "../types/grocery";
import { getGroceries } from "../util/getGroceries";

export const useGetGroceriesQuery = ({ take }: { take: string }) => {
  const { userId } = useAuth();
  return useQuery<Grocery[], Error>(
    ["groceries", userId, take],
    () => getGroceries({ userId, take }),
    {
      enabled: !!userId,
      placeholderData: [],
    },
  );
};
