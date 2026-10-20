import { useQuery } from "@tanstack/react-query";
import { getConversations } from "../queries";

export const useGetConversations = (userId: string) => {
  return useQuery({
    queryKey: ["conversations", userId],
    queryFn: getConversations,
  });
};
