"use client";

import { getConversationDetail } from "@/features/chat/conversation";
import {
  Conversation,
  ConversationMember,
  User,
} from "@/generated/prisma/client";
import { useEffect, useState } from "react";
import { create } from "zustand";

interface SelectConversation {
  conversationId: string | undefined;
  setConversationId: (value: string | undefined) => void;
}

export const useSelectConversation = create<SelectConversation>()((set) => ({
  conversationId: undefined,
  setConversationId: (conversationId) => set(() => ({ conversationId })),
}));

type ConversationDetails =
  | ({
      conversationMembers: ({ user: User } & ConversationMember)[];
    } & Conversation)
  | null;

export const useGetSelectedConversationDetails = () => {
  const { conversationId, setConversationId } = useSelectConversation();

  const [selectedConversation, setSelectedConversation] = useState<
    ConversationDetails | undefined
  >();

  useEffect(() => {
    const fetchConversationDetails = async () => {
      if (!conversationId) {
        setSelectedConversation(undefined);
        return;
      }

      const conversationDetails = await getConversationDetail({
        conversationId: conversationId,
      });
      setSelectedConversation(conversationDetails);
    };

    fetchConversationDetails();
  }, [conversationId]);

  return {
    conversationId,
    setConversationId,
    selectedConversation,
  };
};
