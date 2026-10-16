"use server";

import { authClient } from "@/lib/safe-action";
import { createConversationSchema } from "../types";
import prisma from "@/lib/prisma";

export const createConversationAction = authClient
  .inputSchema(createConversationSchema)
  .action(async ({ parsedInput, ctx }) => {
    const { title, type, avatarUrl, description, membersIds } = parsedInput;
    const { user } = ctx.auth;

    const conversation = await prisma.$transaction(async (tx) => {
      const members = await tx.user.findMany({
        where: {
          id: {
            in: membersIds,
          },
        },
      });

      if (type === "PRIVATE") {
        const conv = await tx.conversation.findFirst({
          where: {
            type: "PRIVATE",
            conversationMembers: {
              some: {
                userId: membersIds[0],
              },
            },
          },
        });

        if (conv) {
          return conv;
        }
      }

      const newConversation = await tx.conversation.create({
        data: {
          type,
          avatarUrl,
          title,
          description,
          createdById: user.id,
          conversationMembers: {
            create: {
              userId: user.id,
              role: "ADMIN",
            },
            createMany: {
              data: members.map((member) => ({
                userId: member.id,
                role: "MEMBER",
              })),
            },
          },
        },
      });

      return newConversation;
    });

    return conversation;
  });
