"use client";

import { create } from "zustand";

interface SelectConversation {
  conversationId: string | undefined;
  setConversationId: (value: string | undefined) => void;
}

export const useSelectConversation = create<SelectConversation>()((set) => ({
  conversationId: undefined,
  setConversationId: (conversationId) => set(() => ({ conversationId })),
}));
