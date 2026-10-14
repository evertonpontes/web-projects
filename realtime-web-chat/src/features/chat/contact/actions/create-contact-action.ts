"use server";

import { authClient } from "@/lib/safe-action";
import { createContactSchema } from "../types";
import prisma from "@/lib/prisma";

export const createContactAction = authClient
  .inputSchema(createContactSchema)
  .action(async ({ parsedInput, ctx }) => {
    const { contactId, nickname } = parsedInput;
    const { user } = ctx.auth;

    const userContact = await prisma.user.findUnique({
      where: {
        id: contactId,
      },
    });

    if (!userContact) {
      throw new Error("User not found!");
    }

    const contact = await prisma.contact.create({
      data: {
        contactId,
        userId: user.id,
        nickname: nickname || userContact.name,
      },
    });

    return contact;
  });
