"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { headers } from "next/headers";

export const getConversations = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return null;
  }

  const { user } = session;

  const conversations = await prisma.conversation.findMany({
    where: {
      conversationMembers: {
        some: {
          userId: user.id,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return conversations;
};
