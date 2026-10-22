"use client";

import { useQuery } from "@tanstack/react-query";
import { getConversationDetail } from "../queries";

export const useGetConversationDetails = ({
  conversationId,
}: {
  conversationId: string;
}) => {
  return useQuery({
    queryKey: ["conversation-details", conversationId],
    queryFn: () => getConversationDetail({ conversationId }),
  });
};
