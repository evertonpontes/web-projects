"use server";

import { authClient } from "@/lib/safe-action";
import { createContactSchema } from "../types";
import prisma from "@/lib/prisma";

export const createContactAction = authClient
  .inputSchema(createContactSchema)
  .action(async ({ parsedInput, ctx }) => {
    const { email, nickname } = parsedInput;
    const { user } = ctx.auth;

    if (email === user.email) {
      throw new Error("Cannot add this email as contact!");
    }

    const userContact = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!userContact) {
      throw new Error("User not found!");
    }

    const contactAlreadyExists = await prisma.contact.findUnique({
      where: {
        userId_contactId: {
          contactId: userContact.id,
          userId: user.id,
        },
      },
    });

    if (contactAlreadyExists) {
      throw new Error("Contact already exists!");
    }

    const contact = await prisma.contact.create({
      data: {
        contactId: userContact.id,
        userId: user.id,
        nickname: nickname || userContact.name,
      },
    });

    return contact;
  });
