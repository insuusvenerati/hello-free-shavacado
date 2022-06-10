import { useSession } from "@clerk/nextjs";
import { useQuery } from "react-query";
import { getGroceries } from "../util/getGroceries";

export const useGetGroceriesQuery = () => {
  const { session } = useSession();
  return useQuery(["groceries", session], () => getGroceries(session));
};
