"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { headers } from "next/headers";

export const getContacts = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return null;
  }

  const { user } = session;

  const contacts = await prisma.contact.findMany({
    where: {
      userId: user.id,
    },
    include: {
      contact: true,
    },
  });

  return contacts;
};
