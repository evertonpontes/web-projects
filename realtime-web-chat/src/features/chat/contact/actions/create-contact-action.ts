"use server";

import { authClient } from "@/lib/safe-action";
import { createContactSchema } from "../types";
import prisma from "@/lib/prisma";

export const createContactAction = authClient.inputSchema(createContactSchema).action(async ({ parsedInput, ctx }) => {
  const { email, nickname } = parsedInput;
  const { user } = ctx.auth;

  const userContact = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!userContact) {
    throw new Error("User not found!");
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
