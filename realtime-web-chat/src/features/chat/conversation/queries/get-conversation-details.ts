"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { headers } from "next/headers";

export const getConversationDetail = async ({
  conversationId,
}: {
  conversationId: string;
}) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return null;
  }

  const { user } = session;

  const conversation = await prisma.conversation.findUnique({
    where: {
      id: conversationId,
    },
    include: {
      conversationMembers: {
        include: {
          user: true,
        },
      },
      chatPreferences: true,
      messages: {
        include: {
          replyTo: true,
          messageAttachments: true,
          messageReactions: {
            include: {
              user: true,
            },
          },
          sender: true,
        },
      },
    },
  });

  return conversation;
};
