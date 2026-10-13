"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export const getCurrent = async () => {
  const response = await auth.api.getSession({
    headers: await headers(),
  });

  if (!response) {
    return null;
  }

  const { user, session } = response;

  return user;
};
